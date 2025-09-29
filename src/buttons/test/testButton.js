module.exports = async (client, interaction, args) => {
  const [user] = args;
  const fullUser = await client.users.fetch(user);
  console.log(fullUser);
};
