import { LightningElement } from 'lwc';

export default class BucketCategory extends LightningElement {

    handleChangeCategory(event) {
        const currentCategory = event.detail.name;
        this.dispatchEvent(new CustomEvent('change', {
            detail: currentCategory
        }));
    }

}