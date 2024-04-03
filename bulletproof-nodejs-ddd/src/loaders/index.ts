import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const truckSchema = {
    // compare with the approach followed in repos and services
    name: 'truckSchema',
    schema: '../persistence/schemas/truckSchema',
  };

  const tripSchema = {
    // compare with the approach followed in repos and services
    name: 'tripSchema',
    schema: '../persistence/schemas/tripSchema',
  };
  
  const pathSchema = {
    // compare with the approach followed in repos and services
    name: 'pathSchema',
    schema: '../persistence/schemas/pathSchema',
  };

  const packingSchema = {
    // compare with the approach followed in repos and services
    name: 'packingSchema',
    schema: '../persistence/schemas/packingSchema',
  };

  const planningSchema = {
    // compare with the approach followed in repos and services
    name: 'planningSchema',
    schema: '../persistence/schemas/planningSchema',
  };

  const userSchema = {
    // compare with the approach followed in repos and services
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };

  const roleSchema = {
    // compare with the approach followed in repos and services
    name: 'roleSchema',
    schema: '../persistence/schemas/roleSchema',
  };

  const truckController = {
    name: config.controllers.truck.name,
    path: config.controllers.truck.path
  }

  const tripController = {
    name: config.controllers.trip.name,
    path: config.controllers.trip.path
  }

  const pathController = {
    name: config.controllers.path.name,
    path: config.controllers.path.path
  }

  const packingController = {
    name: config.controllers.packing.name,
    path: config.controllers.packing.path
  }

  const planningController = {
    name: config.controllers.planning.name,
    path: config.controllers.planning.path
  }

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  }

  const truckRepo = {
    name: config.repos.truck.name,
    path: config.repos.truck.path
  }

  const tripRepo = {
    name: config.repos.trip.name,
    path: config.repos.trip.path
  }

  const pathRepo = {
    name: config.repos.path.name,
    path: config.repos.path.path
  }

  const packingRepo = {
    name: config.repos.packing.name,
    path: config.repos.packing.path
  }

  const planningRepo = {
    name: config.repos.planning.name,
    path: config.repos.planning.path
  }

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }

  const truckService = {
    name: config.services.truck.name,
    path: config.services.truck.path
  }

  const tripService = {
    name: config.services.trip.name,
    path: config.services.trip.path
  }

  const pathService = {
    name: config.services.path.name,
    path: config.services.path.path
  }

  const packingService = {
    name: config.services.packing.name,
    path: config.services.packing.path
  }

  const planningService = {
    name: config.services.planning.name,
    path: config.services.planning.path
  }

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  }

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      truckSchema,
      pathSchema,
      tripSchema,
      packingSchema,
      planningSchema,
      userSchema,
      roleSchema
    ],
    controllers: [
      truckController,
      pathController,
      tripController,
      packingController,
      planningController,
      roleController
    ],
    repos: [
      truckRepo,
      pathRepo,
      tripRepo,
      packingRepo,
      planningRepo,
      userRepo,
      roleRepo
    ],
    services: [
      truckService,
      pathService,
      tripService,
      packingService,
      planningService,
      roleService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
