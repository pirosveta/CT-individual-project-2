public with sharing class MerchandiseController {
    @AuraEnabled (cacheable=true)
    public static Merchandise__c[] getMerchandiseList(String category){
        try {
            Merchandise__c[] merchs = [SELECT Id, Name, Description__c, Price__c, AvailableQuantity__c FROM Merchandise__c 
                                           WHERE Category__c=:category LIMIT 50];  
            return merchs;          
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
