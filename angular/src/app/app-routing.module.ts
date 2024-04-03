import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { WarehouseManagementComponent } from './Components/management/warehouse-management/warehouse-management.component';
import { CreateWarehouseComponent } from './Components/management/warehouse-management/create-warehouse/create-warehouse.component';
import { CreateTruckComponent } from './Components/management/shipping-management/create-truck/create-truck.component';
import { GetTrucksComponent } from './Components/management/shipping-management/get-trucks/get-trucks.component';
import { UpdateTruckComponent } from './Components/management/shipping-management/update-truck/update-truck.component';
import { CreateDeliveryComponent } from './Components/management/warehouse-management/create-delivery/create-delivery.component';
import { AuthGuardGuard } from './helpers/auth-guard.guard';
import { ShippingManagementComponent } from './Components/management/shipping-management/shipping-management.component';
import { LogisticManagementComponent } from './Components/management/logistic-management/logistic-management.component';
import { CreatePackingComponent } from './Components/management/logistic-management/create-packing/create-packing.component';
import { GetWarehousesComponent } from './Components/management/warehouse-management/get-warehouses/get-warehouses.component';
import { GetDeliveriesComponent } from './Components/management/warehouse-management/get-deliveries/get-deliveries.component';
import { UpdatePackingComponent } from './Components/management/logistic-management/update-packing/update-packing.component';
import { GetPackingsComponent } from './Components/management/logistic-management/get-packings/get-packings.component';
import { UpdateWarehouseComponent } from './Components/management/warehouse-management/update-warehouse/update-warehouse.component';
import { CreatePathComponent } from './Components/management/logistic-management/create-path/create-path.component';
import { GetPathsComponent } from './Components/management/logistic-management/get-paths/get-paths.component';
import { GetFleetPlanningComponent } from './Components/management/logistic-management/get-fleet-planning//get-fleet-planning.component';
import { UpdateDeliveryComponent } from './Components/management/warehouse-management/update-delivery/update-delivery.component';
import { SideNavComponent } from './Components/nav-bar/side-bar/sidenav.component';
import { HeaderComponent } from './Components/nav-bar/header/header.component';
import { UpdatePathComponent } from './Components/management/logistic-management/update-path/update-path.component';
import { RoadNetworkComponent } from './Components/3D/road-network/road-network.component';
import { RoutePlanningComponent } from './Components/management/logistic-management/route-planning/route-planning.component';
import { AdminComponent } from './Components/admin/admin.component';
import { RegisterComponent } from './Components/admin/register/register.component';
import { AnonymizeComponent } from './Components/admin/anonymize/anonymize.component';
import { GetRoutePlanningComponent } from './Components/management/logistic-management/get-route-planning/get-route-planning.component';
import { GetSpecificRouteComponent } from './Components/management/logistic-management/get-specific-route/get-specific-route.component';
import { ForbiddenComponent } from './Components/forbidden/forbidden.component';
import { environment } from 'src/environments/environment.prod';
import { DataViewComponent } from './Components/admin/dataview/dataview.component';
import { PrivacyPolicyComponent } from './Components/nav-bar/privacy-policy/privacy-policy.component';
import { env } from 'process';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent },
  {path: 'warehouse-management', component: WarehouseManagementComponent, canActivate: [AuthGuardGuard], data: {permittedRoles: [environment.roles.warehouse, environment.roles.admin]}},
  {path: 'privacy-policy', component: PrivacyPolicyComponent, canActivate: [AuthGuardGuard], data: {permitedRoles: ['0523e4a7-4e3f-4c9a-bc7b-d7569bad5ff3','609dce1d-b1a0-4898-b490-2738b963c67f','765784b7-7b42-4e9e-bf9f-58bc5439cb25','ec89216d-dd33-4822-b80e-40bd910dfbd2']}},
  {
    path: 'warehouse-management', 
    component: WarehouseManagementComponent, 
    canActivate: [AuthGuardGuard], 
    data: {permitedRoles: ['ec89216d-dd33-4822-b80e-40bd910dfbd2','609dce1d-b1a0-4898-b490-2738b963c67f']},
    children:[
      {path: 'create-delivery', component: CreateDeliveryComponent},
      {path: 'get-deliveries', component: GetDeliveriesComponent},
      {path: 'update-warehouse', component: UpdateWarehouseComponent},
      {path: 'update-delivery', component: UpdateDeliveryComponent},
    ]
  },
  {path: 'shipping-management', component: ShippingManagementComponent, canActivate: [AuthGuardGuard], data: {permitedRoles: ['0523e4a7-4e3f-4c9a-bc7b-d7569bad5ff3','609dce1d-b1a0-4898-b490-2738b963c67f']}},
  {
    path: 'shipping-management',
    component: ShippingManagementComponent,
    canActivate: [AuthGuardGuard],
    data: {permitedRoles: ['0523e4a7-4e3f-4c9a-bc7b-d7569bad5ff3','609dce1d-b1a0-4898-b490-2738b963c67f']},
  },
  {path: 'create-warehouse', component: CreateWarehouseComponent,canActivate: [AuthGuardGuard],
  data: {permitedRoles: ['ec89216d-dd33-4822-b80e-40bd910dfbd2','609dce1d-b1a0-4898-b490-2738b963c67f']},},
  {path: 'get-warehouses', component: GetWarehousesComponent,canActivate: [AuthGuardGuard],
  data: {permitedRoles: ['ec89216d-dd33-4822-b80e-40bd910dfbd2','609dce1d-b1a0-4898-b490-2738b963c67f']},},
  {path: 'create-truck', component: CreateTruckComponent,canActivate: [AuthGuardGuard],
  data: {permitedRoles: ['0523e4a7-4e3f-4c9a-bc7b-d7569bad5ff3','609dce1d-b1a0-4898-b490-2738b963c67f']},},
  {path: 'get-trucks', component: GetTrucksComponent,canActivate: [AuthGuardGuard],
  data: {permitedRoles: ['0523e4a7-4e3f-4c9a-bc7b-d7569bad5ff3','609dce1d-b1a0-4898-b490-2738b963c67f']},},
  {path: 'update-truck', component: UpdateTruckComponent,canActivate: [AuthGuardGuard],
  data: {permitedRoles: ['0523e4a7-4e3f-4c9a-bc7b-d7569bad5ff3','609dce1d-b1a0-4898-b490-2738b963c67f']},},
  {path: 'logistic-management', component: LogisticManagementComponent, canActivate: [AuthGuardGuard], data: {permitedRoles: ['765784b7-7b42-4e9e-bf9f-58bc5439cb25','609dce1d-b1a0-4898-b490-2738b963c67f']}},
  {
    path: 'logistic-management',
    component: LogisticManagementComponent,
    canActivate: [AuthGuardGuard],
    data: {permitedRoles: ['765784b7-7b42-4e9e-bf9f-58bc5439cb25','609dce1d-b1a0-4898-b490-2738b963c67f']},
    children:[
      {path: 'create-packing', component: CreatePackingComponent},
      {path: 'get-packings', component: GetPackingsComponent},
      {path: 'update-packing', component: UpdatePackingComponent},
      {path: 'create-path', component: CreatePathComponent},
      {path: 'get-paths', component: GetPathsComponent},
      {path: 'update-path', component: UpdatePathComponent},
      {path: 'route-planning', component: RoutePlanningComponent},
      {path: 'get-route-planning', component: GetRoutePlanningComponent},
      {path: 'get-specific-route', component: GetSpecificRouteComponent},
      {path: 'get-fleet-planning', component: GetFleetPlanningComponent},     
    ]
  },
  {path: 'road-network', component: RoadNetworkComponent, canActivate: [AuthGuardGuard], data: {permitedRoles: ['765784b7-7b42-4e9e-bf9f-58bc5439cb25','609dce1d-b1a0-4898-b490-2738b963c67f']}},

 
  {path: 'side-nav', component: SideNavComponent},
  {path: 'header-nav', component: HeaderComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuardGuard], data: {permitedRoles: ['609dce1d-b1a0-4898-b490-2738b963c67f']}},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuardGuard], data: {permitedRoles: ['609dce1d-b1a0-4898-b490-2738b963c67f']}},
  {path: 'anonymize', component: AnonymizeComponent, canActivate: [AuthGuardGuard], data: {permitedRoles: ['609dce1d-b1a0-4898-b490-2738b963c67f']}},
  {path: 'dataview', component: DataViewComponent, canActivate: [AuthGuardGuard], data: {permitedRoles: ['609dce1d-b1a0-4898-b490-2738b963c67f']}},
  {path: '**', component: ForbiddenComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
