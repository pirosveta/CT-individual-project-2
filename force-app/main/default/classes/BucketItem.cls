public with sharing class BucketItem {
    @AuraEnabled public Id merchId;
    @AuraEnabled public String Name, Description, Category;
    @AuraEnabled public Decimal Quantity, UnitPrice, TotalPrice;

    public BucketItem(Id merchId, String Name, String Description, String Category, Decimal Quantity, Decimal UnitPrice, Decimal TotalPrice) {
        this.merchId = merchId;
        this.Name = Name;
        this.Description = Description;
        this.Category = Category;
        this.Quantity = Quantity;
        this.UnitPrice = UnitPrice;
        this.TotalPrice = TotalPrice;
    }
}
