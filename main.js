// @ts-nocheck

GMEdit.register('file-icons', {
  init: (state) => {
    function setThumb(item) {
      if ($gmedit['ui.treeview.TreeView'].isDirectory(item)) {
        if (item.attributes['data-filter'].value == 'extension') {
          console.log(item);
          $gmedit['ui.treeview.TreeView'].setThumb(
            item.attributes['data-full-path'].value,
            state.dir + '/icons/extentions.png',
            item,
          );
        }

        Array.from(item.children[1].children).forEach(setThumb);
        return;
      }
      const path = item.attributes['data-full-path'].value;
      const kind = item.attributes['data-kind'].value;
      if (!$gmedit['ui.treeview.TreeView'].hasThumb(path) && kind != 'sprite') {
        $gmedit['ui.treeview.TreeView'].setThumb(path, state.dir + '/icons/' + kind + '.png');
      }
    }

    const handleDirClick = $gmedit['ui.treeview.TreeView'].handleDirClick;
    const handleItemClick = $gmedit['ui.treeview.TreeView'].handleItemClick;

    $gmedit['ui.treeview.TreeView'].handleDirClick = (e) => {
      updateThumbs();
      handleDirClick(e);
    };
    $gmedit['ui.treeview.TreeView'].handleItemClick = (e) => {
      updateThumbs();
      handleItemClick(e);
    };

    function updateThumbs() {
      const rootElement = $gmedit['ui.treeview.TreeView'].find(0, 0).children[1];
      Array.from(rootElement.children).forEach((item) => setThumb(item));
    }

    GMEdit.on('projectOpen', (project) => {
      updateThumbs();
    });
  },
});
