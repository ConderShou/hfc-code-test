import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, UserContainer, UsersListContainer } from "./styles";
import { onLoadDashboardUsers } from "../../redux/actions/dashboard-actions";
import { onSelectContent } from "../../redux/actions/content-actions";

export const MainContainer = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.dashboard.users);

  useEffect(() => {
    dispatch(onLoadDashboardUsers());
    // eslint-disable-next-line
  }, []);

  const onSelectUserContent = (userId) => {
    dispatch(onSelectContent(userId));
  }

  return (
    <Container>
      <h1>Users</h1>

      <UsersListContainer>
        {users.map((user) => (
          <UserContainer key={`user-${user.id}`}>
            <h3>{user.name}</h3>
            <button onClick={() => onSelectUserContent(user.id)}>View Content</button>
          </UserContainer>
        ))}
      </UsersListContainer>
    </Container>
  );
};
