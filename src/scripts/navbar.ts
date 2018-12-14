
export function closeNavbarOnItemSelection()
{
    $('#navbar .navbar-brand, #navbar .navbar-nav>li>a:not(.dropdown-toggle)').on('click', function(){
        $('.navbar-collapse').collapse('hide');
    });
}
