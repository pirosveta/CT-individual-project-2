import { LightningElement } from 'lwc';

export default class Category extends LightningElement {
    handleSelect(event) {
        const categoryName = event.detail.name;
        this.dispatchEvent(new CustomEvent('change', {
            detail: categoryName
        }));
    }
}