import * as InAppPurchases from "expo-in-app-purchases";

const SKU = "ironfit_premium_monthly";

export async function initIAP(){
 await InAppPurchases.connectAsync();
 await InAppPurchases.getProductsAsync([SKU]);
}

export async function buyPremium(){
 await InAppPurchases.purchaseItemAsync(SKU);
}

export function listenPurchase(setPremium){
 InAppPurchases.setPurchaseListener(({responseCode, results})=>{
  if(responseCode === InAppPurchases.IAPResponseCode.OK){
    results.forEach(p=>{
      if(!p.acknowledged){
        setPremium(true);
        InAppPurchases.finishTransactionAsync(p, false);
      }
    });
  }
 });
}
