const express = require("express");
//const { GET_GROUPS } = require("../../../src/actions/types");
const Group = require("../../models/Group");
const router = express.Router();


// @route POST api/njanguis/create
// @desc Register user
// @access Public
router.post("/create", async (req, res) => {
    // Form validation
    const { name, description, max_members, id } = req.body;
    const user = req.body.user;
    //console.log(req);
    console.log(user);
    //const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    Group.findOne({ name: req.body.name }).then(group => {
        if (group) {
            return res.status(400).json({ name: "Njangui Name already exists" });
        } else {
            // const { name, description, max_members, id } = req.body;

            const groupFields = {};
            if (name) groupFields.name = name;
            if (description) groupFields.description = description;
            if (max_members) groupFields.max_members = max_members;


            if (!id) {
                groupFields.members = [];
                groupFields.members.push({
                    user: user.id,
                    host: true
                });
            }

            try {
                const newGroup = new Group(groupFields);
                const group = newGroup.save();

                res.json(group);

            } catch (err) {
                console.error(err.message);
                res.status(500).send('Server Error');
            }

        }
    });
});



router.get('/njanguis', async (req, res) => {    
       try {
           const groups = await Group.find().sort({ date: -1 });
           res.json(groups);
           console.log(groups);
   
       } catch (err) {
           console.error(err.message);
           res.status(500).send('Server Error');
       }  

});

module.exports = router;