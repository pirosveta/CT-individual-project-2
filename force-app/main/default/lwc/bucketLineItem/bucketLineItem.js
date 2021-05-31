import { LightningElement, api } from 'lwc';
import { updateRecord, deleteRecord } from 'lightning/uiRecordApi';
import ID_FIELD from '@salesforce/schema/Bucket_Line_Item__c.Id';
import QUANTITY_FIELD from '@salesforce/schema/Bucket_Line_Item__c.Quantity__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class BucketLineItem extends LightningElement {
    @api order;
    @api currentCategory;
    @api desiredCategory = false;
    @api updateQuantity;
    isChange = false;

    get desiredCategory() {
        return (this.order.Category === this.currentCategory);
    }

    handleSubButton(event) {
        this.isChange = true;
        const fields = {};
        fields[ID_FIELD.fieldApiName] = this.order.bucketItemId;
        this.updateQuantity = this.updateQuantity - 1;
        fields[QUANTITY_FIELD.fieldApiName] = this.updateQuantity;

        const recordInput = { fields };
        updateRecord(recordInput);
    }

    handleAddButton(event) {
        this.isChange = true;
        const fields = {};
        fields[ID_FIELD.fieldApiName] = this.order.bucketItemId;
        this.updateQuantity = this.updateQuantity + 1;
        fields[QUANTITY_FIELD.fieldApiName] = this.updateQuantity;

        const recordInput = { fields };
        updateRecord(recordInput);
    }

    handleDeleteButton() {
        deleteRecord(this.order.bucketItemId)
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Item deleted successfully',
                    variant: 'success'
                })
            );
        });
    }

}