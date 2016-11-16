'use babel';

import TreeViewFullWidthView from './tree-view-full-width-view';
import { CompositeDisposable } from 'atom';

export default {

  treeViewFullWidthView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.treeViewFullWidthView = new TreeViewFullWidthView(state.treeViewFullWidthViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.treeViewFullWidthView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'tree-view-full-width:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.treeViewFullWidthView.destroy();
  },

  serialize() {
    return {
      treeViewFullWidthViewState: this.treeViewFullWidthView.serialize()
    };
  }

};
