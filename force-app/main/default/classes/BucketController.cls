public with sharing class BucketController {
    @AuraEnabled
    public static Id checkBucketAvailability(Id userId) {
        List<Bucket__c> bucket = [SELECT Id FROM Bucket__c WHERE User__c=:userId LIMIT 1];
        if (bucket.size() != 0) {
            return bucket[0].Id;
        }
        else {
            return null;
        }
    }
}
