jQuery(document).ready(function($) {
    'use strict';

    $('table.first').DataTable({
        "searching": true,
        "paging": true,
        "info": true,
        "aLengthMenu": [[5, 10], [5, 10, 75, "All"]],
        "iDisplayLength": 5,
        "language": {
            "lengthMenu": "Hiện _MENU_ hàng",
            "zeroRecords": "Không tìm thấy",
            "info": "Đang hiển thị trang _PAGE_ trên _PAGES_",
            "infoEmpty": "Không có bản ghi nào",
            "infoFiltered": "(lọc từ _MAX_ bản ghi)",
            "sSearch": "Tìm kiếm:",
            "oPaginate": {
                "sFirst":    "Đầu",
                "sLast":    "Cuối",
                "sNext":    "Kế",
                "sPrevious": "Lùi"
            }
        }
    });

    if ($("table.first").length) {

        $(document).ready(function() {
            $('table.first').DataTable();
        });
    }

    /* Calender jQuery **/

    if ($("table.second").length) {

        $(document).ready(function() {
            var table = $('table.second').DataTable({
                lengthChange: true,
                "aLengthMenu": [[5, 10], [5, 10, 75, "All"]],
                "iDisplayLength": 5,
                buttons: ['copy', 'excel', 'pdf', 'print'],
                language: {
                    "lengthMenu": "Hiện _MENU_ hàng",
                    "zeroRecords": "Không tìm thấy",
                    "info": "Đang hiển thị trang _PAGE_ trên _PAGES_",
                    "infoEmpty": "Không có bản ghi nào",
                    "infoFiltered": "(lọc từ _MAX_ bản ghi)",
                    "sSearch": "Tìm kiếm:",
                    "oPaginate": {
                        "sFirst":    "Đầu",
                        "sLast":    "Cuối",
                        "sNext":    "Kế",
                        "sPrevious": "Lùi"
                    }
                }
            });

            table.buttons().container()
                .appendTo('#example_wrapper .col-md-6:eq(0)');
        });
    }


    if ($("#example2").length) {

        $(document).ready(function() {
            $(document).ready(function() {
                var groupColumn = 2;
                var table = $('#example2').DataTable({
                    "columnDefs": [
                        { "visible": false, "targets": groupColumn }
                    ],
                    "order": [
                        [groupColumn, 'asc']
                    ],
                    "displayLength": 25,
                    "drawCallback": function(settings) {
                        var api = this.api();
                        var rows = api.rows({ page: 'current' }).nodes();
                        var last = null;

                        api.column(groupColumn, { page: 'current' }).data().each(function(group, i) {
                            if (last !== group) {
                                $(rows).eq(i).before(
                                    '<tr class="group"><td colspan="5">' + group + '</td></tr>'
                                );

                                last = group;
                            }
                        });
                    }
                });

                // Order by the grouping
                $('#example2 tbody').on('click', 'tr.group', function() {
                    var currentOrder = table.order()[0];
                    if (currentOrder[0] === groupColumn && currentOrder[1] === 'asc') {
                        table.order([groupColumn, 'desc']).draw();
                    } else {
                        table.order([groupColumn, 'asc']).draw();
                    }
                });
            });
        });
    }

    if ($("#example3").length) {

        $('#example3').DataTable({
            select: {
                style: 'multi'
            }
        });

    }
    if ($("#example4").length) {

        $(document).ready(function() {
            var table = $('#example4').DataTable({
                fixedHeader: true
            });
        });
    }

});