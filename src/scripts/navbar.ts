
export function closeNavbarOnItemSelection()
{
    $('#navbar .navbar-brand, #navbar .navbar-nav>li>a').on('click', function(){
        $('.navbar-collapse').collapse('hide');
    });
}
