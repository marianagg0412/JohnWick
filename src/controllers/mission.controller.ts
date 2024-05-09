// import {Mission} from "../interfaces/Mission";
// import {registerMission} from "../services/mission.service";
//
// export const registerMissionController = async (req: Request, res: Response) => {
//     const mission: Mission = req.body;
//     try {
//         const newMission = await registerMission(mission);
//         res.status(201).send(newMission);
//     } catch (error) {
//         console.error('Error registering mission:', error);
//         res.status(500).json({ message: 'Error registering mission', error });
//     }
// }