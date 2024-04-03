import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateTruckComponent } from './Components/management/shipping-management/create-truck/create-truck.component';
import { GetTrucksComponent } from './Components/management/shipping-management/get-trucks/get-trucks.component';
import { UpdateTruckComponent } from './Components/management/shipping-management/update-truck/update-truck.component';
import { LoginComponent } from './Components/login/login.component';
import { WarehouseManagementComponent } from './Components/management/warehouse-management/warehouse-management.component';
import { CreateWarehouseComponent } from './Components/management/warehouse-management/create-warehouse/create-warehouse.component';
import {ShippingManagementComponent} from './Components/management/shipping-management/shipping-management.component';
import { RouterModule } from '@angular/router';
import { LogisticManagementComponent } from './Components/management/logistic-management/logistic-management.component';
import { GetWarehousesComponent } from './Components/management/warehouse-management/get-warehouses/get-warehouses.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar/nav-bar.component';
import { SideNavComponent } from './Components/nav-bar/side-bar/sidenav.component';
import { CreateDeliveryComponent } from './Components/management/warehouse-management/create-delivery/create-delivery.component';
import { CreatePackingComponent } from './Components/management/logistic-management/create-packing/create-packing.component';
import { UpdatePackingComponent } from './Components/management/logistic-management/update-packing/update-packing.component';
import { GetDeliveriesComponent } from './Components/management/warehouse-management/get-deliveries/get-deliveries.component';
import { GetPackingsComponent } from './Components/management/logistic-management/get-packings/get-packings.component';
import { UpdateWarehouseComponent } from './Components/management/warehouse-management/update-warehouse/update-warehouse.component';
import { CreatePathComponent } from './Components/management/logistic-management/create-path/create-path.component';
import { GetPathsComponent } from './Components/management/logistic-management/get-paths/get-paths.component';
import { GetFleetPlanningComponent } from './Components/management/logistic-management/get-fleet-planning//get-fleet-planning.component';
import { UpdateDeliveryComponent } from './Components/management/warehouse-management/update-delivery/update-delivery.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './Components/nav-bar/header/header.component';
import { CommonModule } from '@angular/common';
import { UpdatePathComponent } from './Components/management/logistic-management/update-path/update-path.component';
import { RoadNetworkComponent } from './Components/3D/road-network/road-network.component';
import { RoutePlanningComponent } from './Components/management/logistic-management/route-planning/route-planning.component';
import { AdminComponent } from './Components/admin/admin.component';
import { RegisterComponent } from './Components/admin/register/register.component';
import { GetRoutePlanningComponent } from './Components/management/logistic-management/get-route-planning/get-route-planning.component';
import { GetSpecificRouteComponent } from './Components/management/logistic-management/get-specific-route/get-specific-route.component';
import { ForbiddenComponent } from './Components/forbidden/forbidden.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login'
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import { AnonymizeComponent } from './Components/admin/anonymize/anonymize.component';
import { DataViewComponent } from './Components/admin/dataview/dataview.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from "@angular/flex-layout";
import { PrivacyPolicyComponent } from './Components/nav-bar/privacy-policy/privacy-policy.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    CreateTruckComponent,
    GetTrucksComponent,
    UpdateTruckComponent,
    LoginComponent,
    WarehouseManagementComponent,
    CreateWarehouseComponent,
    CreateDeliveryComponent,
    ShippingManagementComponent,
    LogisticManagementComponent,
    GetWarehousesComponent,
    NavBarComponent,
    SideNavComponent,
    CreatePackingComponent,
    UpdatePackingComponent,
    GetPackingsComponent,
    GetDeliveriesComponent,
    UpdateWarehouseComponent,
    CreatePathComponent,
    GetPathsComponent,
    UpdateDeliveryComponent,
    HeaderComponent,
    UpdatePathComponent,
    RoadNetworkComponent,
    RoutePlanningComponent,
    AdminComponent, 
    RegisterComponent, GetRoutePlanningComponent, GetSpecificRouteComponent, ForbiddenComponent, AnonymizeComponent, DataViewComponent, GetFleetPlanningComponent, PrivacyPolicyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    // * MATERIAL IMPORTS
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRippleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    SocialLoginModule,
    NgxChartsModule,
    MatCardModule,
    FlexLayoutModule
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '1026748687060-qdjpuuen4rrgb919gpimq68amat9hg0m.apps.googleusercontent.com'
          )
        }
      ]
      } as SocialAuthServiceConfig,
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }



