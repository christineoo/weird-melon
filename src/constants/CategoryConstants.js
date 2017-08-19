export const CATEGORY = [
  'category 1',
  'category 2',
  'category 3'
];

export const CATEGORY_MAP = CATEGORY.reduce((obj, category) =>
    Object.assign({}, obj, {
      [category]: 1
    }), {});
