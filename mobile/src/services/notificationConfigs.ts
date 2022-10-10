import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async()=>(
        {
            shoudShowAlert:true,
            shoudPlaySound:true,
            shoudSetBadge:true
        }
    ),
})