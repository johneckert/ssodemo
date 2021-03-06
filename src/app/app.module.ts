import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { MsalModule, MsalInterceptor } from "@azure/msal-angular";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ProfileComponent } from "./profile/profile.component";
import { HomeComponent } from "./home/home.component";

const isIE =
  window.navigator.userAgent.indexOf("MSIE ") > -1 ||
  window.navigator.userAgent.indexOf("Trident/") > -1;

@NgModule({
  declarations: [AppComponent, ProfileComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    AppRoutingModule,
    MsalModule.forRoot(
      {
        auth: {
          clientId: "2ac878ba-5deb-4ec9-811d-2ecabf903715",
          authority:
            "https://login.microsoftonline.com/be2189e0-840a-419c-a4da-bd793d03396a",
          redirectUri: "https://johneckert.github.io/ssodemo/", //'http://localhost:4200/',
        },
        cache: {
          cacheLocation: "localStorage",
          storeAuthStateInCookie: isIE, // set to true for IE 11
        },
      },
      {
        popUp: !isIE,
        consentScopes: ["user.read", "openid", "profile"],
        unprotectedResources: [],
        protectedResourceMap: [
          ["https://graph.microsoft.com/v1.0/me", ["user.read"]],
        ],
        extraQueryParameters: {},
      }
    ),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
