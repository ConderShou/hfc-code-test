import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;

  h1 {
    font-size: 25px;
  }
`;

export const UsersListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserContainer = styled.div``;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 20px;
`;

export const Content = styled.div`
  border: 0.9px solid #242F57;
  border-radius: 4px;
  box-shadow: 0 3.37px 3.37px rgba(0, 0, 0, 0.25);
  min-width: 260px;
  max-width: 280px;
  font-size: 12px;
  font-weight: 900;
  justify-content: center;
  cursor: ${props => props.disabled ? "not-allowed" : "inherit"};
`
export const ContentTopContainer = styled.div`
  padding: 10px;  
`;

export const StatusContainer = styled.div`
  margin-top: 2px;
`;

export const StatusLabel = styled.label`
  border: 0.38px solid black;
  border-radius: 4px 0 0 4px; 
  width: fit-content;
  padding: 3.5px 4px 3.5px 4px;
`;

export const StatusContent = styled(StatusLabel)`
  border-radius: 0 4px 4px 0;
  border-left: none;
  background-color: #242F57;
  color: white;
`;

export const ContentImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const ContentImage = styled.img`
  margin: 18px 0px 15px 0px;
  width: 95%;
  height: 150px;
  border-radius: 4px;
  object-fit: cover;
  object-position: center;
`;

export const ContentFooter = styled.div`
  display: ${props => props.disabled ? "none" : "flex"};
  justify-content: space-between;
  border-top-style: solid;
  border-top-width: 0.38px;
  border-top-color: #000;
  border-radius: 3px;
  padding: 10px;
  background-color: #EAEDF7;
`;

const ChangeStatusButton = styled.button`
  width: 108px;
  background-color: transparent;
  outline-style: solid;
  border: none;
  outline-width: 0.9px;
  padding: 3px 25px 3px 25px;
  font-weight: inherit;

  &:hover {
    cursor: pointer;
    outline-width: 1.2px;
  }
`;

export const RejectButton = styled(ChangeStatusButton)`
  color: #EF4333;
  outline-color: #EF4333;
`;

export const ApproveButton = styled(ChangeStatusButton)`
  color: #009245;
  outline-color: #009245;
`;

export const ViewContentButton = styled.button`
  padding: 15px;
  color: white;
  background-color: #3527EA;
  border: none;
  font-size: 11px;
  cursor: pointer;
`