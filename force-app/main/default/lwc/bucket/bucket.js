import { LightningElement, wire } from 'lwc';
import getOrderList from '@salesforce/apex/BucketController.getOrderList';
import { createRecord } from 'lightning/uiRecordApi';
import INVOICE_OBJECT from '@salesforce/schema/Invoice__c';
import INVOICE_ITEM_OBJECT from '@salesforce/schema/Invoice_Line_Item__c';
import STATUS_FIELD from '@salesforce/schema/Invoice__c.Status__c';
import QUANTITY_FIELD from '@salesforce/schema/Invoice_Line_Item__c.Quantity__c';
import UNIT_PRICE_FIELD from '@salesforce/schema/Invoice_Line_Item__c.Unit_Price__c';
import INVOICE_FIELD from '@salesforce/schema/Invoice_Line_Item__c.Invoice__c';
import MERCHANDISE_FIELD from '@salesforce/schema/Invoice_Line_Item__c.Merchandise__c'; 
import Id from '@salesforce/user/Id';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Bucket extends LightningElement {
    userId = Id;
    orders;
    currentCategory = 'Select Category';
    statusCode = 'Open';

    @wire(getOrderList, {userId: '$userId'})
    wiredOrders({data}) {
        if (data) {
            this.orders = data;
        };
    };

    handleChangeCategory(event) {
        this.currentCategory = event.detail;
    }

    handleHomeButton(event) {
        this.dispatchEvent(new CustomEvent('home'));
    }

    handleBuyButton(event) {
        const isAvailable = true;
        for (let item in this.orders) {
            if (item.Quantity > item.AvailableQuantity) {
                isAvailable = false;
                break;
            }
        };
        if (isAvailable) {
            const fields = {};
            fields[STATUS_FIELD.fieldApiName] = this.statusCode;
            const recordInput = { apiName: INVOICE_OBJECT.objectApiName, fields };
            createRecord(recordInput)
                .then(record => {
                    const invoiceId = record.id;
                    this.orders.forEach(function(item) {
                        const itemFields = {};
                        itemFields[QUANTITY_FIELD.fieldApiName] = item.Quantity;
                        itemFields[UNIT_PRICE_FIELD.fieldApiName] = item.UnitPrice;
                        itemFields[MERCHANDISE_FIELD.fieldApiName] = item.merchId;
                        itemFields[INVOICE_FIELD.fieldApiName] = invoiceId;
                        const itemInput = { apiName: INVOICE_ITEM_OBJECT.objectApiName, itemFields };
                        createRecord(itemInput)
                            .then(() => {
                                this.dispatchEvent(
                                    new ShowToastEvent({
                                        title: 'Success',
                                        message: 'Invoice created successfully',
                                        variant: 'success'
                                    })
                                );
                            });
                    });
                });
        } else {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: "Error creating invoice",
                    message: 'The available quantity is less than the selected',
                    variant: "error"
                })
            );
        }
    }
}