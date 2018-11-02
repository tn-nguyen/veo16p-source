define([], function() {

  'use strict';

  var view = WebView.View.extend({

    /////////////////////////////////////////////////////////////////////////////////////////////////
    // View Variables
    currentTablePage: 1,
    maxTablePage: 1,
    searchState: false,
    searching: false,

    /////////////////////////////////////////////////////////////////////////////////////////////////
    // View override
    init: function() {
      var selectOption, optionValue, setupTableData,
          channel = parseInt(w.INFO.Channel, 10),
          my = this;
      if (this.parent.currentPage != 'search') return;
      $('.setupCameraCameraInstallationSearchSpecific').hide();
      $('.setupCameraCameraInstallationSearchSearching').hide();
      $('#setupCameraCameraInstallationSetupAll').prop('disabled', 'disabled');

      // value initialize
      $('#selectSetupCameraCameraInstallationSearchType').val('0');
      WebView.log('search table init');
      $('.tdCameraCameraInstallationSearchCh option').each(function() {
        selectOption = $(this);
        optionValue = parseInt(selectOption.val(), 10);
        if (optionValue >= channel) {
          selectOption.remove();
        }
      });
      this.clearTable();
      this.searchState = true;
      if (this.model) {this.model.fetch({success: function() {
        my.updateEnable();
      }});}

      WebView.scm.registCallback("INFY_IPCAM_INSTALL_NOTIFY", this.scmIpcamInstallNotifyCallback, this);
      // setupTableData = v.setupCameraCameraInstallationSetupTable.model.attributes;
      // for (var i in setupTableData) {
      //   WebView.log(i);
      //   this.model.set(i, setupTableData[i]);
      // }
      my.clearTable();
      WebView.ajax.apiCall({
        action: 'set_setup',
        menu: 'camera.openmode_scan_camera',
        callback: this.searchReturnHandler
      });
      my.searchStartHandler();
    },

    finalize: function() {
      if (this.model) {this.model.clear();}
      this.searchState = false;
      WebView.scm.unregistCallback("INFY_IPCAM_INSTALL_NOTIFY", this.scmIpcamInstallNotifyCallback);
    },

    events: {
      'change #selectSetupCameraCameraInstallationSearchType': 'changeSearchTypeHandler',
      'change #setupCameraCameraInstallationSearchSpecificHost': 'changeSpecificHandler',
      'change #setupCameraCameraInstallationSearchSpecificPort': 'changeSpecificHandler',
      'click #buttonSetupCameraCameraInstallationSearch': 'searchClickHandler',
      'click .tdCameraCameraInstallationSearchSetup': 'setupClickHandler',
      'click .tdCameraCameraInstallationSearchPieview': 'previewClickHandler',
      'click #tdCameraCameraInstallationSearchPrevious': 'clickPreviousTable',
      'click #tdCameraCameraInstallationSearchNext': 'clickNextTable',
      'change .tdCameraCameraInstallationSearchCh': 'changeChHandler'
    },

    render: function(events) {
      var key, value, temp;

      if (!this.searchState) return;

      for (var i in events.changed) {
        key = i;
        value = events.changed[i];
        if (typeof value == 'undefined') continue;

        if (!isNaN(parseInt(key, 10))) {
          this.updateTableRow(value);
        }

        switch (key) {
          case 'assigned_cnt':
            value = parseInt(value);
            value = w.text('# OF ASSIGNED CAMERAS : %d', value);
            $('#setupCameraCameraInstallationSearchAssigned').text(value);
            break;
          case 'entry_cnt':
            value = parseInt(value);
            this.setPageRange(value);
            break;
          case 'recognized_cnt':
            value = parseInt(value);
            value = w.text('# OF FOUND CAMERAS : %d', value);
            $('#setupCameraCameraInstallationSearchFound').text(value);
            break;
          case 'setup_needed_cnt':
            value = parseInt(value);
            value = w.text('# OF CAMERAS NEEDED TO BE SET : %d', value);
            $('#setupCameraCameraInstallationSearchNeed').text(value);
            break;
          default:
            break;
        }
      }
    },

    /////////////////////////////////////////////////////////////////////////////////////////////////
    // View event handler
    changeSearchTypeHandler: function(event) {
      var searchType = $('#selectSetupCameraCameraInstallationSearchType').val();

      $('.setupCameraCameraInstallationSearchSpecific').hide();

      switch (searchType) {
        case '0':
          // Auto scan (LAN)
          $('#buttonSetupCameraCameraInstallationSearch').removeAttr('disabled');
          break;
        case '1':
          // IP range (LAN)
          break;
        case '2':
          // Specific IP / Host name
          $('#setupCameraCameraInstallationSearchSpecificHost').val('');
          $('#setupCameraCameraInstallationSearchSpecificPort').val('');
          $('#buttonSetupCameraCameraInstallationSearch').attr('disabled', 'disabled');
          $('.setupCameraCameraInstallationSearchSpecific').show();
          break;
        default:
          break;
      }
    },

    changeSpecificHandler: function(event) {
      var host = $('#setupCameraCameraInstallationSearchSpecificHost').val(),
          port = $('#setupCameraCameraInstallationSearchSpecificPort').val();
      if (host != '' && port != '')
        $('#buttonSetupCameraCameraInstallationSearch').removeAttr('disabled');
      else
        $('#buttonSetupCameraCameraInstallationSearch').attr('disabled', 'disabled');
    },

    searchClickHandler: function(event) {
      var my = this,
          scmCallback,
          api = '',
          searchType = $('#selectSetupCameraCameraInstallationSearchType').val();

      my.searchState = true;

      switch (searchType) {
        case '0':
          // Auto scan (LAN)
          my.clearTable();
          WebView.ajax.apiCall({
            action: 'set_setup',
            menu: 'camera.openmode_scan_camera',
            callback: this.searchReturnHandler
          });
          my.searchStartHandler();
          break;
        case '1':
          // IP range (LAN)
          break;
        case '2':
          // Specific IP / Host name
          WebView.ajax.apiCall({
            action: 'set_setup',
            menu: 'camera.openmode_add_device_manual',
            data: {
              host: $('#setupCameraCameraInstallationSearchSpecificHost').val(),
              port: $('#setupCameraCameraInstallationSearchSpecificPort').val()
            },
            callback: this.searchReturnHandler
          });
          break;
        default:
          break;
      }
      
    },

    searchReturnHandler: function(resp) {

    },

    setupClickHandler: function(event) {
      var my = this;
      var index = event.target.id.split('_')[1];

      var indexData;

      indexData = _.extend({}, {data: my.model.get(index)}, {
          caller: this,
          mode: 'search',
          dialogOk: this.ipcameraConfigurationReturnHandler
      });

      v.dialogIpcameraConfiguration.open(indexData);
    },

    ipcameraConfigurationReturnHandler: function(ret) {
      var my = v.setupCameraCameraInstallationSearchTable;
      my.model.set(ret.ch, ret);
    },

    previewClickHandler: function(event) {
      var my = this;
      var index = event.target.id.split('_')[1];

      var indexData;

      //block preview
      return;
      w.video.jpeg.stop();
      WebView.ajax.apiCall({
        action: 'set_setup',
        menu: 'camera.openmode_set_preview',
        data: {
          index: index
        }
      });
      w.video.jpeg.setChannel('0');
      w.video.jpeg.setCallback(my.updatePreview);
      w.video.jpeg.start(1000);
    },

    changeChHandler: function(event) {
      WebView.log('changeChHandler called');
      WebView.log(event);
      var index = event.target.id.split('_')[1],
          currentValue = event.target.value,
          tempIndex, tempData, currentData, api;

      currentData = _.clone(this.model.get(index));
      if (currentValue != '-1') {
        tempIndex = this.findIndexByCh(currentValue);
        tempData = _.clone(this.model.get(tempIndex));
      }

      if (tempData) {
        tempData.ch = currentData.ch;
      }
      currentData.ch = currentValue;

      WebView.ajax.apiCall({
        action: 'set_setup',
        menu: 'camera.openmode_set_channel',
        data: {
          index: index,
          ch: (currentData.ch == '-1' ? '256' : currentData.ch)
        }
      });

      this.model.set(index, currentData);
      if (tempData) {
        this.model.set(tempIndex, tempData);
      }
    },

    /////////////////////////////////////////////////////////////////////////////////////////////////
    // SCM Notify callback
    // INFY_IPCAM_INSTALL_NOTIFY
    scmIpcamInstallNotifyCallback: function(notify) {
      var my = v.setupCameraCameraInstallationSearchTable,
          param;

      param = notify.data[0].param;
      if (param === '0') {
        my.searchFinishHandler();
      } else if (param === '1') {
      }

      WebView.ajax.apiCall({
        action: 'get_setup',
        menu: 'camera.openmode_list',
        callback: my.getListReturnHandler
      });
    },

    getListReturnHandler: function(resp) {
      var my = v.setupCameraCameraInstallationSearchTable;

      for (var i in resp) {
        my.model.set(i, resp[i]);
      }

      if (my.searching == false) {
        my.updateEnable();
      }
    },

    /////////////////////////////////////////////////////////////////////////////////////////////////
    // General Methods
    searchStartHandler: function() {
      this.searching = true;
      $('.selectSetupCameraCameraInstallationSearchType').hide();
      $('.setupCameraCameraInstallationSearchSpecific').hide();
      $('.setupCameraCameraInstallationSearchSearching').show();
      $('#buttonSetupCameraCameraInstallationSearch').prop('disabled', 'disabled');
    },

    searchFinishHandler: function() {
      this.searching = false;
      $('.selectSetupCameraCameraInstallationSearchType').show();
      this.changeSearchTypeHandler();
      $('.setupCameraCameraInstallationSearchSearching').hide();
      $('#buttonSetupCameraCameraInstallationSearch').removeProp('disabled');
      this.updateEnable();
    },

    findIndexByCh: function(ch) {
      var ret = null, currentData,
          list = this.model.attributes;

      for (var i in list) {
        if (!isNaN( parseInt(i, 10))) {
          if (list[i].ch === ch) { 
            ret = i;
            break;
          }
        }
      }

      return ret;
    },

    clearTable: function() {
      var value;
      this.currentTablePage = 1;
      this.maxTablePage = 1;
      this.changeTable(1);
      if (this.model) {this.model.clear();}

      value = w.text('# OF ASSIGNED CAMERAS : %d');
      $('#setupCameraCameraInstallationSearchAssigned').text(value);
      value = w.text('# OF FOUND CAMERAS : %d');
      $('#setupCameraCameraInstallationSearchFound').text(value);
      value = w.text('# OF CAMERAS NEEDED TO BE SET : %d');
      $('#setupCameraCameraInstallationSearchNeed').text(value);

      for (var i = 0 ; i < 64 ; i += 1) {
        $('#tdCameraCameraInstallationSearchModel_' + i).text('');
        $('#tdCameraCameraInstallationSearchAddress_' + i).text('');
        $('#tdCameraCameraInstallationSearchStatus_' + i).text('');
        $('#tdCameraCameraInstallationSearchAssignedChannel_' + i).val('-1');
        $('#tdCameraCameraInstallationSearchAssignedChannel_' + i).attr('disabled', 'disabled');
        $('#tdCameraCameraInstallationSearchSetup_' + i).attr('disabled', 'disabled');
        $('#tdCameraCameraInstallationSearchPreview_' + i).attr('disabled', 'disabled');
      }
    },

    clickPreviousTable: function() {
      if (1 < this.currentTablePage) {
        this.currentTablePage -= 1;
        this.changeTable(this.currentTablePage);
      }
    },

    clickNextTable: function() {
      if (this.currentTablePage < 4 && this.currentTablePage < this.maxTablePage) {
        this.currentTablePage += 1;
        this.changeTable(this.currentTablePage);
      }
    },

    changeTable: function(page) {
      page = parseInt(page, 10);
      if (page < 1 || 4 < page) return false;
      this.currentTablePage = page;
      $('.tableCameraCameraInstallationSearch').hide();
      $('#tableCameraCameraInstallationSearch' + (page - 1)).show();
      $('#setupCameraCameraInstallationSearchPageState').text(this.currentTablePage + ' / ' + this.maxTablePage);
    },

    setPageRange: function(entryCnt) {
      var page;
      entryCnt = parseInt(entryCnt, 10);
      page = Math.floor(entryCnt / 16) + ( (entryCnt % 16) > 0 ? 1 : 0);
      this.maxTablePage = page;
      $('#setupCameraCameraInstallationSearchPageState').text(this.currentTablePage + ' / ' + this.maxTablePage);
    },

    updatePreview: function(url) {
      $("#imgCameraInstallationPreview").attr("src", url);
    },

    updateEnable: function() {
      var model = this.model,
          entry_cnt = model.get('entry_cnt'),
          currentEntry;

      for (var i = 0 ; i < entry_cnt ; i += 1) {
        currentEntry = model.get(i);
        $('#tdCameraCameraInstallationSearchSetup_' + i).removeClass('needSetup');
        switch (this.isPossibleSetup(currentEntry.state)) {
          case 'disabled':
            $('#tdCameraCameraInstallationSearchSetup_' + i).attr('disabled', 'disabled');
            break;
          case 'needSetup':
            $('#tdCameraCameraInstallationSearchSetup_' + i).addClass('needSetup');
          case 'enabled':
            $('#tdCameraCameraInstallationSearchAssignedChannel_' + i).removeAttr('disabled');
            $('#tdCameraCameraInstallationSearchSetup_' + i).removeAttr('disabled');
            $('#tdCameraCameraInstallationSearchPreview_' + i).removeAttr('disabled');
            break;
          default:
            break;
        }
      }
    },

    updateTableRow: function(data) {
      var index = data.index,
          ch = data.ch;

      if (!this.searchState) return;

      $('#tdCameraCameraInstallationSearchModel_' + index).text(data.model);
      $('#tdCameraCameraInstallationSearchAddress_' + index).text(data.hostname);
      $('#tdCameraCameraInstallationSearchStatus_' + index).text(this.getStatusString(data.state));
      $('#tdCameraCameraInstallationSearchAssignedChannel_' + index).val(ch);
    },

    isPossibleSetup: function(status) {
      var ret = 'disabled';
      status = parseInt(status, 10);

      switch (status) {
        case 3:
        case 4:
          ret = 'enabled';
          break;
        case 1:
        case 7:
        case 8:
        case 9:
        case 10:
          ret = 'needSetup';
          break;
        default:
          ret = 'disabled';
          break;
      }
      return ret;
    },

    getStatusString: function(status) {
      var ret = null;
      status = parseInt(status, 10);

      switch (status) {
        case 0:
          ret = '';
          break;
        case 1:
          ret = w.text('CONNECTING');
          break;
        case 2:
          ret = '';
          break;
        case 3:
        case 4:
          ret = w.text('OK');
          break;
        case 5:
          ret = w.text('ASSIGNED CHANNEL');
          break;
        case 6:
          ret = w.text('OK');
          break;
        case 7:
          ret = w.text('INVALID IP');
          break;
        case 8:
          ret = w.text('NEED TO CHANGE PASSWORD');
          break;
        case 9:
          ret = w.text('CONNECTION FAIL');
          break;
        case 10:
          ret = w.text('LOGIN FAIL');
          break;
        case 11:
          ret = w.text('STREAM FAIL');
          break;
        default:
          break;
      }
      return ret;
    }
  });
  return view;
});