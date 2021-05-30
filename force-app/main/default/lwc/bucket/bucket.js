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

export default class Bucket extends LightningElement {
    userId = Id;
    orders = [];
    phoneItem;
    isPhone=false;
    laptopItem;
    isLaptop=false;

    @wire(getOrderList, {userId: '$userId'})
    wiredOrders({data}) {
        if (data) {
            this.orders = data;
        };
    };

    handleHomeButton(event) {
        this.dispatchEvent(new CustomEvent('home'));
    }

    set phoneItem(value) {
        if (value.Category__c === 'Phone') {
            this.isPhone = true;
        } 
        else {
            this.isPhone = false;
        }
    }

    handleBuyButton(event) {
        const fields = {};
        fields[STATUS_FIELD.fieldApiName] = 'Open';
        const recordInput = { apiName: INVOICE_OBJECT.objectApiName, fields };
        createRecord(recordInput);

        for (const item in this.orders) {
            fields = {};
            fields[QUANTITY_FIELD.fieldApiName] = this.bucketId;
            fields[UNIT_PRICE_FIELD.fieldApiName] = this.merchandise.Id;
            fields[UNIT_PRICE_FIELD.fieldApiName] = this.merchandise.Price;
            const recordInput = { apiName: INVOICE_ITEM_OBJECT.objectApiName, fields };
            createRecord(recordInput);
        }
    }

    set laptopItem(value) {
        if (value.Category__c === 'Laptop') {
            this.isLaptop = true;
        }
        else {
            this.isLaptop = false;
        }
    }
}