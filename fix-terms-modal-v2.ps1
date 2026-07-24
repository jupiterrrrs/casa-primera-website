$path = "src\app\components\TermsModal.tsx"
$lines = [System.Collections.Generic.List[string]]::new()
Get-Content $path | ForEach-Object { $lines.Add($_) }

$idx = ($lines | Select-String -Pattern "Reservation Request Made on").LineNumber - 1

[string[]]$newBlock = @(
'                <p style={{ fontSize: "0.72rem", color: "#999999" }}>Reservation Request Made on</p>',
'                <p style={{ fontSize: "0.9rem", color: "#333333", fontWeight: 600 }}>{bookingDate}</p>',
'                <p style={{ fontSize: "0.72rem", color: "#999999", marginTop: "0.5rem" }}>Booking Date:</p>',
'                <p style={{ fontSize: "0.9rem", color: "#333333", fontWeight: 800 }}>{stayLabel}</p>',
'                <p style={{ fontSize: "0.72rem", color: "#999999", marginTop: "0.5rem" }}>Check-in/ Check-out</p>',
'                <p style={{ fontSize: "0.9rem", color: "#333333", fontWeight: 600 }}>3:00 PM/ 12:00 NN</p>'
)

$lines.RemoveRange($idx, 5)
$lines.InsertRange($idx, [string[]]$newBlock)

Set-Content -Path $path -Value $lines

Write-Host "Done. Verifying..."
Select-String -Path $path -Pattern "Booking Date:"
