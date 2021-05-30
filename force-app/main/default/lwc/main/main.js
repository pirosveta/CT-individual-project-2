import { LightningElement } from 'lwc';

export default class Main extends LightningElement {
    isHomePage = true;

    handleChangePage(event) {
        this.isHomePage = !this.isHomePage;
    }
}