import { LightningElement, api, track, wire} from 'lwc';
import getMerchandiseList from '@salesforce/apex/MerchandiseController.getMerchandiseList';

export default class Selection extends LightningElement {
    @api selectedCategory;
    @api selectedCategoryPlural;
    @track merchandises = [];
    
    @wire (getMerchandiseList, {category: '$selectedCategory'}) 
    wiredMerchandises({data}) {
        if (data) {
            this.merchandises = data;
        };
    };
}