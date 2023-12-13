import React from 'react';

const UserCardComponent = ({username}: { username?: string }) => {
    return (
        <div>
            Пользователь - {username ?? "user"}
        </div>
    );
};

export default UserCardComponent;