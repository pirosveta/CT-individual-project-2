import { LightningElement, track } from 'lwc';

export default class Home extends LightningElement {
    categoryName;
    categoryPluralName = 'Select Category';

    handleChangeCategory(event) {
        this.categoryName = event.detail;
        this.categoryPluralName = this.categoryName + 's';
    }

    handleBucketButton(event) {
        this.dispatchEvent(new CustomEvent('bucket'));
    }
}