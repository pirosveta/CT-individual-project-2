import { LightningElement, api, wire } from 'lwc';
import checkBucketAvailability from '@salesforce/apex/BucketController.checkBucketAvailability';
import { createRecord } from 'lightning/uiRecordApi';
import Id from '@salesforce/user/Id';
import BUCKET_OBJECT from '@salesforce/schema/Bucket__c';
import USER_FIELD from '@salesforce/schema/Bucket__c.User__c';
import ITEM_OBJECT from '@salesforce/schema/Bucket_Line_Item__c';
import BUCKET_FIELD from '@salesforce/schema/Bucket_Line_Item__c.Bucket__c';
import MERCHANDISE_FIELD from '@salesforce/schema/Bucket_Line_Item__c.Merchandise__c';
import QUANTITY_FIELD from '@salesforce/schema/Bucket_Line_Item__c.Quantity__c';
import UNIT_PRICE_FIELD from '@salesforce/schema/Bucket_Line_Item__c.Unit_Price__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class StoreLineItem extends LightningElement {
    @api merchandise;
    quantity = 1;
    userId = Id;
    @wire(checkBucketAvailability, {userId: '$userId'}) 
    wiredBucketId({data}) {
        this.bucketId = data;
    };

    handleQuantityInput(event) {
        const newQuantity = event.detail.value;
        if (newQuantity > this.merchandise.AvailableQuantity__c) {
            event.detail.value = 1;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: "Error input quantity",
                    message: 'The available quantity is less than the selected',
                    variant: "error"
                })
            );
        } else {
            this.quantity = newQuantity;
        }
    }

    handleAddButton(event) {
        if (this.bucketId === null) {
            const fields = {};
            fields[USER_FIELD.fieldApiName] = this.userId;
            const recordInput = { apiName: BUCKET_OBJECT.objectApiName, fields };
            createRecord(recordInput)
                .then(record => {
                    this.bucketId = record.data.Id;
                });
        }
        const fields = {};
        fields[BUCKET_FIELD.fieldApiName] = this.bucketId;
        fields[MERCHANDISE_FIELD.fieldApiName] = this.merchandise.Id;
        fields[QUANTITY_FIELD.fieldApiName] = this.quantity;
        fields[UNIT_PRICE_FIELD.fieldApiName] = this.merchandise.Price__c;
        const recordInput = { apiName: ITEM_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Merchandise added to bucket',
                        variant: 'success'
                    })
                );
            });
    }
}