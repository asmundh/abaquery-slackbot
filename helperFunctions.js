export const extractMessage = message => message.substr(message.indexOf('>') + 2);


export const selectN = (people, N) => {
  const selected = [];

  for (let i = 0; i < N; i += 1) {
    const indexToPop = Math.floor(Math.random() * people.length);
    selected.push(people[indexToPop]);
    people.splice(indexToPop, 1);
  }

  return selected;
};

export const formatChosen = (chosen) => {
  let retStr = `I chose ${chosen[0]}`;

  if (chosen.length > 1) {
    for (let i = 1; i < chosen.length - 1; i += 1) {
      retStr += `, ${chosen[i]} `;
    }
    retStr += `and ${chosen[chosen.length - 1]}!`;
  }
  return retStr;
};

const getProfileNames = (usersArray) => {
  const newArr = [];

  usersArray.forEach((element) => {
    if (element.is_bot === false) {
      newArr.push(element.profile.real_name);
    }
  });

  return newArr;
};

const removeDeletedUsers = (arr) => {
  const newArr = [];
  arr.forEach((element) => {
    if (!element.deleted) {
      newArr.push(element);
    }
  });
  return newArr;
};

const getUserNameFromId = (userArray, userId) => {
  let foundName = '';
  userArray.forEach((user) => {
    if (user.id === userId) foundName = user.real_name;
  });
  return (foundName || 'Not found');
};

export const getCorrespondingUsername = (bot, userId) => {
  let users = bot.getUsers()._value.members;

  users = removeDeletedUsers(users);
  return getUserNameFromId(users, userId);
};
