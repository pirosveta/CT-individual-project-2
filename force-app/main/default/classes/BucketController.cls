public with sharing class BucketController {

    @AuraEnabled (cacheable=true)
    public static Id checkBucketAvailability(Id userId) {
        List<Bucket__c> bucket = [SELECT Id FROM Bucket__c WHERE User__c=:userId LIMIT 1];
        if (bucket.size() != 0) {
            return bucket[0].Id;
        }
        else {
            return null;
        }
    }

    @AuraEnabled (cacheable=true)
    public static List<BucketItem> getOrderList(Id userId){
        try {
            Id bucketId = [SELECT Id FROM Bucket__c WHERE User__c=:userId LIMIT 1][0].Id;
            List<BucketItem> orders = new List<BucketItem>();
            Bucket_Line_Item__c[] items = [SELECT Id, Quantity__c, Unit_Price__c, Total_Price__c, Merchandise__c 
                                            FROM Bucket_Line_Item__c 
                                            WHERE Bucket__c=:bucketId LIMIT 1000];  
            List<Id> merchId = new List<Id>();
            for (Bucket_Line_Item__c i : items) {
                merchId.add(i.Merchandise__c);
            }
            List<Merchandise__c> merchs = [SELECT Id, Name, Category__c FROM Merchandise__c
                                           WHERE Id IN :merchId];
            for (Bucket_Line_Item__c i : items) {
                for (Merchandise__c m : merchs) {
                    if (i.Merchandise__c == m.Id) {
                        orders.add(new BucketItem(m.Id, m.Name, m.Description__c, m.Category__c, i.Quantity__c, i.Unit_Price__c, i.Total_Price__c));
                    }
                }
            }
            return orders;          
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
