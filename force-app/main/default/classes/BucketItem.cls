public with sharing class BucketItem {
    @AuraEnabled public Id merchId, bucketItemId;
    @AuraEnabled public String Name, Description, Category;
    @AuraEnabled public Decimal Quantity, AvailableQuantity, UnitPrice, TotalPrice;

    public BucketItem(Id merchId, Id bucketItemId, String Name, String Description, String Category, Decimal Quantity, 
                      Decimal AvailableQuantity, Decimal UnitPrice, Decimal TotalPrice) {
        this.merchId = merchId;
        this.bucketItemId = bucketItemId;
        this.Name = Name;
        this.Description = Description;
        this.Category = Category;
        this.Quantity = Quantity;
        this.AvailableQuantity = AvailableQuantity;
        this.UnitPrice = UnitPrice;
        this.TotalPrice = TotalPrice;
    }
}
