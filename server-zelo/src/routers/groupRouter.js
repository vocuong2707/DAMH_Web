const Router = require('express')
const {
    newGroups,
    removeMembersFromGroup,
    setCoLeader,
    transferOwnership,
    getGroupMembers,
    getNonGroupFriends,
    addMembersToGroup,
    getGroupList,
    deleteGroup,
    leaveGroup,
} = require('../controllers/groupController')
const groupRouter = Router()


groupRouter.post('/new-groups', newGroups)
groupRouter.delete('/remove-members-from-group', removeMembersFromGroup)
groupRouter.put('/set-co-leader', setCoLeader)
groupRouter.put('/transfer-ownership', transferOwnership)
groupRouter.get('/get-group-members', getGroupMembers)
groupRouter.get('/get-non-group-friends', getNonGroupFriends)
groupRouter.post('/add-members-to-group', addMembersToGroup)
groupRouter.get('/get-group-list/:userId', getGroupList)
groupRouter.delete('/delete-group', deleteGroup)
groupRouter.delete('/leave-group', leaveGroup)




module.exports = groupRouter