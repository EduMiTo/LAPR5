import { Router } from 'express';
import truck from './routes/truckRoute';
import path from './routes/pathRoute';
import trip from './routes/tripRoute';
import packing from './routes/packingRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import auth from './routes/userRoute';
import planningRoute from './routes/planningRoute';

export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	truck(app);
	path(app);
	trip(app);
	packing(app);
	planningRoute(app);
	
	
	return app
}