
import { useState } from 'react'
import { List, ListItem, ListItemText, MenuItem, Menu } from '@material-ui/core'

const activitiesHere = [
 'a bunch',
 'of',
 'different',
 'activities'
];

export default function AddMenu() {
  const [activitySelect, setActivitySelect] = useState('banana');
  const [selectedIndex, setSelectedIndex] = useState(1);

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
            primary="Add Activity to Routine" 
            secondary={activitySelect[selectedIndex]} 
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
        {activitiesHere.map((activity, index) => (
          <MenuItem
            key={activity}
            disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {activity}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}