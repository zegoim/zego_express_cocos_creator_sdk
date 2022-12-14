// The following emoji array is obtained from this json,
// you may need to add the latest emoji to this array yourself
// https://github.com/carloscuesta/gitmoji/blob/master/src/data/gitmojis.json
const gitmojis = [
  '๐จ','โก๏ธ','๐ฅ','๐','๐','โจ','๐','๐','๐','๐',
  'โ','๐','๐','๐จ','๐ง','๐','โฌ๏ธ','โฌ๏ธ','๐','๐ท',
  '๐','โป๏ธ','โ','โ','๐ง','๐จ','๐','โ๏ธ','๐ฉ','โช',
  '๐','๐ฆ','๐ฝ','๐','๐','๐ฅ','๐ฑ','โฟ๏ธ','๐ก','๐ป',
  '๐ฌ','๐','๐','๐','๐ฅ','๐ธ','๐','๐ฑ','๐คก','๐ฅ',
  '๐','๐ธ','โ','๐','๐ท๏ธ','๐ฑ','๐ฉ','๐ฅ','๐ซ','๐',
  '๐','๐ฉน','๐ง','โฐ๏ธ', '๐งช', '๐', '๐ฉบ', '๐งฑ', '๐งโ๐ป'
];

module.exports = {
  // Default rule: config-conventional
  // https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional#rules
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      // We change the parser regex pattern to match emoji UTF-8 character
      // The "[\u23ea-\ufe0f]{1,2}" means that some emojis are in two bytes but not one
      // So this pattern matchs string like "๐ Fix a bug"
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
