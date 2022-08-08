// The following emoji array is obtained from this json,
// you may need to add the latest emoji to this array yourself
// https://github.com/carloscuesta/gitmoji/blob/master/src/data/gitmojis.json
const gitmojis = [
  '🎨','⚡️','🔥','🐛','🚑','✨','📝','🚀','💄','🎉',
  '✅','🔒','🔖','🚨','🚧','💚','⬇️','⬆️','📌','👷',
  '📈','♻️','➕','➖','🔧','🔨','🌐','✏️','💩','⏪',
  '🔀','📦','👽','🚚','📄','💥','🍱','♿️','💡','🍻',
  '💬','🗃','🔊','🔇','👥','🚸','🏗','📱','🤡','🥚',
  '🙈','📸','⚗','🔍','🏷️','🌱','🚩','🥅','💫','🗑',
  '🛂','🩹','🧐','⚰️', '🧪', '👔', '🩺', '🧱', '🧑‍💻'
];

module.exports = {
  // Default rule: config-conventional
  // https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional#rules
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      // We change the parser regex pattern to match emoji UTF-8 character
      // The "[\u23ea-\ufe0f]{1,2}" means that some emojis are in two bytes but not one
      // So this pattern matchs string like "🐛 Fix a bug"
      headerPattern: /^([\u23ea-\ufe0f]{1,2})(?:\(([\w\$\.\-\* ]*)\))? (.*)$/,
      headerCorrespondence: ['type', 'scope', 'subject']
    }
  },
  rules: {
    'type-enum': [2, 'always', gitmojis],
    'type-case': [0, 'always', 'lower-case'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-case': [2, 'always', 'sentence-case'],
    'header-min-length': [2, 'always', 15],
    'header-max-length': [2, 'always', 100],
    'body-max-line-length': [2, 'always', 200],
  }
};
