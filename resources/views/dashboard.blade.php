<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/dataTables.bootstrap5.min.css">
    <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/dataTables.bootstrap5.min.js"></script>
    <title>Finance Tracker</title>
</head>
<body>
    @php
        $totalIncome = 0;
        $totalExpense = 0;
    @endphp
    <div class="table-responsive container mt-5">
        <table class="table table-striped table-hover table-sm datatable">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Type</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Time</th>
                    <th scope="col">Description</th>
                    <th scope="col">Tag Name</th>
                    <th scope="col">Category Name</th>
                    <th scope="col">Method</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($data as $item)
                @php
                    $amount = $item->type->type_name === "Income" ? $item->amount : -$item->amount;
                    $totalIncome += $item->type->type_name === "Income" ? $item->amount : 0;
                    $totalExpense += $item->type->type_name === "Expense" ? $item->amount : 0;
                @endphp
                    <tr class="table-{{ $item->type->type_name === 'Income' ? 'success' : 'danger' }}">
                        <td>{{ $item->type->type_name }}</td>
                        <td>{{ $item->amount }}</td>
                        <td>{{ \Carbon\Carbon::parse($item->time)->format("d m Y") }}</td>
                        <td>{{ $item->description }}</td>
                        <td>{{ $item->tag->tag_name }}</td>
                        <td>{{ optional($item->tag->category)->category_name }}</td>
                        <td>{{ $item->method->method_name }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        <div class="mt-4">
            <h3>Total Income: {{ $totalIncome }}</h3>
            <h3>Total Expenses: {{ $totalExpense }}</h3>
            <h3>Balance: {{ $totalIncome - $totalExpense }}</h3>
        </div>
    </div>


    <!-- Include jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <!-- Include DataTables CSS and JS -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/dataTables.bootstrap5.min.css">
    <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/dataTables.bootstrap5.min.js"></script>

    <!-- DataTables Initialization Script -->
    <script>
        $(document).ready(function() {
            $('.datatable').DataTable();
        });
    </script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>
