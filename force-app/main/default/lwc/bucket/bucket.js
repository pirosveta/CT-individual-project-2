import { LightningElement } from 'lwc';

export default class Bucket extends LightningElement {
    handleHomeButton(event) {
        this.dispatchEvent(new CustomEvent('home'));
    }
}