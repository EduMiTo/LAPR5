import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 3000,

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI || "mongodb+srv://Pentax:Ola1ola2ola3@mongodb.detw68e.mongodb.net/teste2",

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    truck: {
      name: "TruckController",
      path: "../controllers/truckController"
    },
    trip: {
      name: "TripController",
      path: "../controllers/tripController"
    },
    path: {
      name: "PathController",
      path: "../controllers/pathController"
    },
    packing: {
      name: "PackingController",
      path: "../controllers/packingController"
    },
    planning: {
      name: "PlanningController",
      path: "../controllers/planningController"
    },
    role: {
      name: "RoleController",
      path: "../controllers/roleController"
    }
  },

  repos: {
    truck: {
      name: "TruckRepo",
      path: "../repos/truckRepo"
    },
    trip: {
      name: "TripRepo",
      path: "../repos/tripRepo"
    },
    path: {
      name: "PathRepo",
      path: "../repos/pathRepo"
    },
    packing: {
      name: "PackingRepo",
      path: "../repos/packingRepo"
    },
    planning: {
      name: "PlanningRepo",
      path: "../repos/planningRepo"
    },
    user: {
      name: "UserRepo",
      path: "../repos/userRepo"
    },
    role: {
      name: "RoleRepo",
      path: "../repos/roleRepo"
    }
  },

  services: {
    truck: {
      name: "TruckService",
      path: "../services/truckService"
    },
    trip: {
      name: "TripService",
      path: "../services/tripService"
    },
    path: {
      name: "PathService",
      path: "../services/pathService"
    },
    packing: {
      name: "PackingService",
      path: "../services/packingService"
    },
    planning: {
      name: "PlanningService",
      path: "../services/planningService"
    },
    role: {
      name: "RoleService",
      path: "../services/roleService"
    },
    user: {
      name: "UserService",
      path: "../services/userService"
    }
  },
};
