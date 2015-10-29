Template.menuCollectionItem.helpers({
  href() {
    const instance = Template.instance();
    return `/dashboard/content/${instance.data.item.name.toLowerCase()}`;
  },
  className() {
    const instance = Template.instance();
    return `fa fa-${instance.data.item.conf.icon}`;
  },
  name() {
    const instance = Template.instance();
    return instance.data.item.conf.title;
  }
});
