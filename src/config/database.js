module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'merx',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
