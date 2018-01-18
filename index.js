$(() => {

  $.ajax({
    type: 'GET',
    url:'http://rest.learncode.academy/api/jsj2018/songs/',
    headers: {  'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT ,DELETE' }
  })
    .done((res) => res.forEach(s => $('#songList').append(createSong(s))))

  $('#songForm').submit((e) => {
    e.preventDefault()
    $.post(
      'http://rest.learncode.academy/api/jsj2018/songs/',
      {
        artist: `${e.target.artist.value}`,
        title: `${e.target.title.value}`,
        url: `${e.target.url.value}`
      })
      .done((res) => {
        $('#songList').append(createSong(res))
      })    
  })

  const createSong = (song) => {
    let span = $('<span></span>').addClass('input-group input-group-lg').attr({'id': song.id})
    let link = $(`<a>${song.artist} - ${song.title}</a>`).addClass('form-control').attr({'href': song.url})
    let div = $('<div></div>').addClass('input-group-append')
    let button = $('<button>Search</button>').addClass('btn btn-danger btn-sm delete-button')

    return span.append(link, div.append(button))
  }

  $(document).on('click', '.delete-button', (e) => {
    let song = $(e.target).closest('span')
    $.ajax({
      type: 'DELETE', 
      url:`http://rest.learncode.academy/api/jsj2018/songs/${song.attr('id')}`
    }).done(() => song.remove())
  })

})