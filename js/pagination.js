const containerPagination = (totalPages) => {
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get('page',) || 1);

    const buttons = [
        {
            text: `<i class="fa-solid fa-angles-left"></i>`,
            id: 'buttonFirstPage',
            onClick: () => {
                params.set('page', 1);
                window.location.href = `${window.location.pathname}?${params.toString()}`;
            }
        },
        {
            text: `<i class="fa-solid fa-angle-left"></i>`,
            id: 'buttonPreviousPage',
            onClick: () => {
                params.set('page', page - 1);
                window.location.href = `${window.location.pathname}?${params.toString()}`;
            }
        },
        {
            text: page,
            id: 'actualPage'
        },
        {
            text: `<i class="fa-solid fa-angle-right"></i>`,
            id: 'buttonNextPage',
            onClick: () => {
                params.set('page', page + 1);
                window.location.href = `${window.location.pathname}?${params.toString()}`;
            }
        },
        {
            text: `<i class="fa-solid fa-angles-right"></i>`,
            id: 'buttonLastPage',
            onClick: () => {
                params.set('page', totalPages);
                window.location.href = `${window.location.pathname}?${params.toString()}`;
            }
        },

    ]
    const pagination = document.createElement('div');
    pagination.classList.add('contenedorPaginador');

    buttons.forEach(button =>{
        const buttonNode = document.createElement('button');
        buttonNode.innerHTML = button.text;
        buttonNode.addEventListener('click', button.onClick)
        pagination.appendChild(buttonNode)
        buttonNode.setAttribute('id', button.id)
    })
    contenedorPaginador.appendChild(pagination)
    const buttonFirstPage = document.getElementById('buttonFirstPage');
    const buttonPreviousPage = document.getElementById('buttonPreviousPage');
    const buttonNextPage = document.getElementById('buttonNextPage');
    const buttonLastPage = document.getElementById('buttonLastPage');
    if (page === 1){
        buttonFirstPage.disabled = true;
        buttonPreviousPage.disabled = true;
        buttonFirstPage.classList.add('disabled');
        buttonPreviousPage.classList.add('disabled');
    }
    else{
        buttonFirstPage.disabled = false;
        buttonPreviousPage.disabled = false;
        buttonFirstPage.classList.remove('disabled');
        buttonPreviousPage.classList.remove('disabled');
    }
    if (page >= totalPages){
        buttonLastPage.disabled = true;
        buttonNextPage.disabled = true;
        buttonLastPage.classList.add('disabled');
        buttonNextPage.classList.add('disabled');
    }
    else{
        buttonLastPage.disabled = false;
        buttonNextPage.disabled = false;
        buttonLastPage.classList.remove('disabled');
        buttonNextPage.classList.remove('disabled');
    }
}