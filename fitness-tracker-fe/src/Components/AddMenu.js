
import { useState } from 'react'
import { List, ListItem, ListItemText, MenuItem, Menu } from '@material-ui/core'



const AddMenu = (props) => {
  const [activitySelect, setActivitySelect] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { activities } = props;

  const handleClickListItem = (event) => {
    setActivitySelect(event.currentTarget);
  };
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setActivitySelect(event.target.value);
  };
  const handleClose = () => {
    setActivitySelect("grape");
  };
  return (
    <div className='menu'>
      <List component="nav" aria-label="Device settings">
        <ListItem
          button
          
        >
          <div 
            className="actionButton" 
            onClick={handleClickListItem}
            >Add Activity
            </div> 
        </ListItem>
      </List>
      <Menu
        id="addActivity"
        activitySelect={activitySelect}
        keepMounted
        open={Boolean(activitySelect)}
        onClose={handleClose}
      >
        {activities ? activities.map((activity, index) => {
            return (
              <div className="card" key={index} id={activity.id}>
                <header>
                  <h3 className="cardTitle">{activity.name.toUpperCase()}</h3>
                  <hr />
                  <h3 className="cardSubtitle">Description: {activity.description}</h3>
                </header>
            </div>
            )
          }): null}
      </Menu>
    </div>
  );
}

export default AddMenu;