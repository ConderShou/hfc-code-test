import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  Container, 
  ContentContainer, 
  ContentTopContainer,
  Content, 
  ContentImage, 
  ContentImageContainer, 
  ContentFooter, 
  RejectButton, 
  ApproveButton,
  StatusContainer, 
  StatusLabel, 
  StatusContent, 
  UserContainer, 
  UsersListContainer,
  ViewContentButton
} from "./styles";
import { onLoadDashboardUsers } from "../../redux/actions/dashboard-actions";
import { onSelectContent, onChangeContentStatus } from "../../redux/actions/content-actions";

export const MainContainer = () => {
  const dispatch = useDispatch();
  const [hideViewContentButton, setHideViewContentButton] = useState({})
  const users = useSelector((state) => state.dashboard.users);
  const allContent = useSelector((state => state.content.allContent));

  useEffect(() => {
    dispatch(onLoadDashboardUsers());
    // eslint-disable-next-line
  }, []);

  const onSelectUserContent = (userId) => {
    dispatch(onSelectContent(userId));
    setHideViewContentButton({
      ...hideViewContentButton,
      [userId]: true
    })
  }

  const loadUserContent = (userId) => {
    return userId in allContent ? allContent[userId] : []
  }

  const onRejectContent = (userId, contentId) => {
    dispatch(onChangeContentStatus(userId, contentId, "rejected"));
  }

  const onApproveContent = (userId, contentId) => {
    dispatch(onChangeContentStatus(userId, contentId, "approved"))
  }

  const isApproved = (status) => status === "approved";
  
  return (
    <Container>
      <h1>Users</h1>

      <UsersListContainer>
        {users.map((user) => (
          <UserContainer key={`user-${user.id}`}>
            <h3>{user.name}</h3>
            <ContentContainer>
              {loadUserContent(user.id).map(content => (
                <Content key={`${user.id}${content.id}`}>
                  <ContentTopContainer>
                    <StatusContainer>
                      <StatusLabel>STATUS</StatusLabel>
                      <StatusContent>{content.status.toUpperCase()}</StatusContent>
                    </StatusContainer>
                    <ContentImageContainer>
                      <ContentImage src={content.url} />
                    </ContentImageContainer>
                  </ContentTopContainer>
                  <ContentFooter disabled={isApproved(content.status)}>
                    <RejectButton onClick={() => onRejectContent(user.id, content.id)}>
                      REJECT
                    </RejectButton>
                    <ApproveButton onClick={() => onApproveContent(user.id, content.id)}>
                      APPROVE
                    </ApproveButton>
                  </ContentFooter>
                </Content>
              ))}
            </ContentContainer>
            {!hideViewContentButton[user.id] && <ViewContentButton onClick={() => onSelectUserContent(user.id)}>VIEW CONTENT</ViewContentButton>}
          </UserContainer>
        ))}
      </UsersListContainer>
    </Container>
  );
};
