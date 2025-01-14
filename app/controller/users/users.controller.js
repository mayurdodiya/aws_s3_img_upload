const db = require('./../../models')
const geoGraphicalDistance = require('./../../services/geoGraphicalDistance')
var logger = require('./../../services/logger')

const Users = db.users

module.exports = {
    // add User
    createUser: async (req, res) => {
        try {
            const { name, email, password, latitude, longitude } = req.body
            var obj = {
                name: name,
                email: email,
                password: password,
                latitude: latitude,
                longitude: longitude
            }
            const user = await Users.create(obj)
            logger.info('user/add');
            return res.status(201).json({ success: true, message: "User created successfully", })

        } catch (error) {
            logger.error(error.message);
            return res.status(500).json({ success: false``, message: "User not created successfully" })
        }
    },
    // get all users
    getAllUsers: async (req, res) => {
        try {
            const users = await Users.findAll()
            logger.info('user/get');
            return res.json({ success: true, data: users })
        } catch (error) {
            logger.error(error.message);
            return res.status(500).json({ success: false, message: "Failed to get users" })
        }
    },
    // get user distance
    getAll2KmNearUser: async (req, res) => {
        try {
            var myUser = await Users.findOne({ where: { id: 'c4a0ba18-601f-42ef-96ea-bd301e13bfc3' } })
            var myLat = myUser.latitude
            var myLong = myUser.longitude

            var nearUser = []

            const allUser = await Users.findAll()
            await allUser.map((item) => {
                var userDistance = {
                    latitude: item.latitude,
                    longitude: item.longitude,
                    distance: geoGraphicalDistance.getDistanceFromLatLonInKm(myLat, myLong, item.latitude, item.longitude)
                }

                if (userDistance.distance <= 2) {
                    nearUser.push(item)
                }
            })
            logger.info('user/getnearuser');
            return res.status(200).json({ success: true, message: 'all user get successfully!', data: nearUser })

        } catch (error) {
            logger.error(error.message);
        }
    }


}