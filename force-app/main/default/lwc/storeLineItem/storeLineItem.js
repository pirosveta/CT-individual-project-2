import { LightningElement, api, wire } from 'lwc';
import checkBucketAvailability from '@salesforce/apex/BucketController.checkBucketAvailability';
import { createRecord, generateRecordInputForCreate } from 'lightning/uiRecordApi';
import Id from '@salesforce/user/Id';
import BUCKET_OBJECT from '@salesforce/schema/Bucket__c';
import USER_FIELD from '@salesforce/schema/Bucket__c.User__c';
import ITEM_OBJECT from '@salesforce/schema/Bucket_Line_Item__c';
import BUCKET_FIELD from '@salesforce/schema/Bucket_Line_Item__c.Bucket__c';
import MERCHANDISE_FIELD from '@salesforce/schema/Bucket_Line_Item__c.Merchandise__c';
import QUANTITY_FIELD from '@salesforce/schema/Bucket_Line_Item__c.Quantity__c';
import UNIT_PRICE_FIELD from '@salesforce/schema/Bucket_Line_Item__c.Unit_Price__c';

export default class StoreLineItem extends LightningElement {
    @api merchandise;
    quantity = 1;
    userId = Id;
    @wire(checkBucketAvailability, {userId: '$userId'}) bucketId;

    handleQuantityInput(event) {
        this.quantity = event.detail.value;
    }

    handleAddButton(event) {
        if (this.bucketId != null) {
            const fields = {};
            fields[BUCKET_FIELD.fieldApiName] = this.bucketId;
            fields[MERCHANDISE_FIELD.fieldApiName] = this.merchandise.Id;
            fields[QUANTITY_FIELD.fieldApiName] = this.quantity;
            fields[UNIT_PRICE_FIELD.fieldApiName] = this.merchandise.Price;
            const recordInput = { apiName: ITEM_OBJECT.objectApiName, fields };
            createRecord(recordInput);
        }
        else {
            const fields = {};
            fields[USER_FIELD.fieldApiName] = this.userId;
            const recordInput = { apiName: BUCKET_OBJECT.objectApiName, fields };
            createRecord(recordInput);
        }
    }
}