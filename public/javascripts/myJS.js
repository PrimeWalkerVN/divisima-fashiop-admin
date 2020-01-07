let apiUrl = 'https://still-plateau-02404.herokuapp.com/';

let nItems = 5;
let nLoaded = 0;
let nTurn = 0;
let sortType = "normal";

let productsDbUrl = "https://still-plateau-02404.herokuapp.com/";
let queryStr = "";
let categorySingleProductHtmlUrl = '../snippets/single-product-snippet.hbs';
let searchResultHtml = '/snippets/search-result.hbs';
let snippet;
let data = [];

getSnippet = async () => {
  await $.get(categorySingleProductHtmlUrl, (data, status) => {
    snippet = data;
  });
}

getSnippet();

getData = async () => {
  let realProductsDbUrl = productsDbUrl + nTurn + "/" + sortType + queryStr;
  realProductsDbUrl = encodeURI(realProductsDbUrl);
  let delta;
  await $.get(realProductsDbUrl, (res, status) => {
    data = res;
    delta = res.length;
    nTurn++;
  });
  buildView();
  nLoaded = data.length;
}

buildView = () => {
  let finalHtml = "";
  for (let i = 0; i < data.length; i++) {
    let tmp = insertProperty(snippet, "title", data[i].title);
    tmp = insertProperty(tmp, "price", data[i].price);
    tmp = insertProperty(tmp, "imagePath", data[i].imagePath);
    tmp = insertProperty(tmp, "_id", 'products/' + data[i]._id);
    finalHtml += tmp;
  }
  $("#single-products-section").empty();
  $("#single-products-section").append(finalHtml);
}


activePageNum = (pageNum) => {
  $('.pagination.page-item').each(function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
    }

    if (parseInt($(this)[0].innerText) == pageNum) {
      $(this).addClass("active");
    }
  });
}


loadMoreNew = (nPage) => {
  activePageNum(nPage);

  (async () => {
    if (nPage * nItems > nLoaded) {
      await getData();
    }

    $('.f_p_item').each(function (i) {
      if ($(this)[0].style.display == 'block') {
        $(this)[0].style.display = 'none';
      }
    });

    $('.f_p_item').each(function (i) {
      if (i >= nItems * (nPage - 1) && (i < nItems * nPage)) {
        if ($(this)[0].style.display == 'none') {
          $(this)[0].style.display = 'block';
        }
      }
    });
  })();
}


filter = () => {
  let tmpQueryStr = "?type=";
  $(".type-filter input").each(function () {
    if ($(this)[0].checked) {
      tmpQueryStr += $(this)[0].value + ",";
    }
  });
  tmpQueryStr = tmpQueryStr.substring(0, tmpQueryStr.length - 1);

  tmpQueryStr += "&brand=";
  $(".brand-filter input").each(function () {
    if ($(this)[0].checked) {
      tmpQueryStr += $(this)[0].value + ",";
    }
  });
  tmpQueryStr = tmpQueryStr.substring(0, tmpQueryStr.length - 1);

  tmpQueryStr += "&title=";
  tmpQueryStr += $('.search-txt')[0].value;
  console.log($('.search-txt')[0].value);
  if (tmpQueryStr == ('&title=')) {
    tmpQueryStr += $('#advanced-search')[0].value;
  }

  tmpQueryStr += "&color=";
  $(".color-filter input").each(function () {
    if ($(this)[0].checked) {
      tmpQueryStr += $(this)[0].value + ",";
    }
  });
  tmpQueryStr = tmpQueryStr.substring(0, tmpQueryStr.length - 1);
  queryStr = tmpQueryStr;

  nTurn = 0;
  nLoaded = 0;

  loadMoreNew(1);
}

sort = (type) => {
  sortType = type;
  nTurn = 0;
  nLoaded = 0;
  loadMoreNew(1);
}

$(".nice-select.sorting li").each(function () {
  if ($(this).attr("data-value") == 1) {
    $(this).attr('onclick', () => {
      return "sort('normal')";
    })
  }

  if ($(this).attr("data-value") == 2) {
    $(this).attr('onclick', () => {
      return "sort('priceAsc')";
    })
  }

  if ($(this).attr("data-value") == 3) {
    $(this).attr('onclick', () => {
      return "sort('priceDsc')";
    })
  }
});

insertProperty = (snippet, key, value) => {
  var pattern = "{{" + key + "}}";
  let tmp = snippet;
  tmp = tmp.replace(new RegExp(pattern, "g"), value);
  return tmp;
}

search = () => {
  $('#dynamic-body').empty();
  $.get(searchResultHtml, (data, status) => {
    $('#dynamic-body').append(data);
  });

  filter();
}

$('#add-product').click(() => {
  let color;
  $('.fw-color-choose input').each(function () {
    if ($(this)[0].checked == true) {
      color = $(this)[0].value;
    }
  });

  let fd = new FormData();
  fd.append('title', $('#inputText3')[0].value);
  fd.append('price', $('#inputText4')[0].valueAsNumber);
  fd.append('brand', $('#input-select-brand')[0].value);
  fd.append('typeProduct', $('#input-select-type')[0].value);
  fd.append('color', color);
  fd.append('imagePath', $('#customFile')[0].value);
  fd.append('productImage', $('#customFile')[0].files[0]);

  $.ajax({
    type: 'POST',
    url: apiUrl,
    data: fd,
    contentType: false,
    processData: false,
    success: () => {
      console.log('Success');
      $('#error-dialogue').removeClass('alert-danger');
      $('#error-dialogue').addClass('alert-success');
      $('#error-dialogue').text('Add product successfully');
    },
    error: (xhr, status, error) => {
      console.log('error posting');
      console.log(xhr.status);
      console.log(xhr.statusText);
      if (xhr.status == 500) {
        $('#error-dialogue').addClass(['alert', 'alert-danger']);
        $('#error-dialogue').text('Invalid format file at field productImage');
      }
      else if (xhr.status == 422) {
        $('#error-dialogue').addClass(['alert', 'alert-danger']);
        $('#error-dialogue').text(JSON.parse(xhr.responseText).errors[0].msg + ' at ' + JSON.parse(xhr.responseText).errors[0].param);
      }
    }
  });
});

$('#modify-product').click(() => {
  let color;
  $('.fw-color-choose input').each(function () {
    if ($(this)[0].checked == true) {
      color = $(this)[0].value;
    }
  });

  let fd = new FormData();
  fd.append('id', $('#product-id')[0].innerText);
  fd.append('title', $('#inputText3')[0].value);
  fd.append('price', $('#inputText4')[0].valueAsNumber);
  fd.append('brand', $('#input-select-brand')[0].value);
  fd.append('typeProduct', $('#input-select-type')[0].value);
  fd.append('color', color);
  fd.append('imagePath', $('#customFile')[0].value);
  fd.append('productImage', $('#customFile')[0].files[0]);

  $.ajax({
    type: 'POST',
    url: apiUrl + 'modify',
    data: fd,
    contentType: false,
    processData: false,
    success: () => {
      console.log('Success');
      $('#error-dialogue').removeClass('alert-danger');
      $('#error-dialogue').addClass('alert-success');
      $('#error-dialogue').text('Update product successfully');
    },
    error: (xhr, status, error) => {
      console.log('error posting');
      console.log(xhr.status);
      console.log(xhr.statusText);
      if (xhr.status == 500) {
        $('#error-dialogue').addClass(['alert', 'alert-danger']);
        $('#error-dialogue').text('Invalid format file at field productImage');
      }
      else if (xhr.status == 422) {
        $('#error-dialogue').addClass(['alert', 'alert-danger']);
        $('#error-dialogue').text(JSON.parse(xhr.responseText).errors[0].msg + ' at ' + JSON.parse(xhr.responseText).errors[0].param);
      }
    },
    always: () => {
      console.log('a');
    }
  });
});

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#preview-img-placeholder').empty();

      $('#preview-img-placeholder')
        .append('<img id="blah" alt="your image" width="100px" height="100px"/>');
      $('#blah').attr('src', e.target.result);
      $('#blah').css('margin-bottom', '20px');
    }

    reader.readAsDataURL(input.files[0]);
  }
}

$("#customFile").change(function () {
  readURL(this);
});

$(document).ready(async () => {
  loadMoreNew(1);
});

$('.type-filter input').click(filter);
$('.title-filter').click(filter);
$('.brand-filter input').click(filter);
$('.color-filter input').click(filter);

(function (global) {
  let dc = {};
  dc.deleteItem = function (itemId) {
    let fd = new FormData();
    fd.append('id', itemId.slice(9));

    $.ajax({
      type: 'POST',
      url: apiUrl + 'delete',
      data: fd,
      processData: false,
      contentType: false,
      success: () => {
        console.log('Success');
      },
      error: (xhr, status, error) => {
        console.log('error posting');
        console.log(xhr.status);
        console.log(xhr.statusText);
        if (xhr.status == 500) {
          $('#error-dialogue').addClass(['alert', 'alert-danger']);
          $('#error-dialogue').text('Invalid format file at field productImage');
        }
        else if (xhr.status == 422) {
          $('#error-dialogue').addClass(['alert', 'alert-danger']);
          $('#error-dialogue').text(JSON.parse(xhr.responseText).errors[0].msg + ' at ' + JSON.parse(xhr.responseText).errors[0].param);
        }
      }
    });

    console.log('jumping');
    loadMoreNew(1);
  }
  global.dc = dc;
})(window);