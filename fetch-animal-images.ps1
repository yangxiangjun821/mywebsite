$ErrorActionPreference = 'Stop'
$titles = @('Saola','Okapi','Aye-aye','Proboscis monkey','Hirola','Pygmy three-toed sloth','Sunda pangolin','Axolotl','Gharial','Hawksbill sea turtle','Kākāpō','Helmeted hornbill','Philippine eagle','African penguin','Vaquita','Whale shark','Largetooth sawfish','Giant oceanic manta ray','European eel','Golden poison frog')
$headers = @{ 'User-Agent' = 'VanishingWildEducationalSite/1.0 (animal image attribution)' }
$results = @()
if (Test-Path 'images/animal-photo-credits.json') { $results = @(Get-Content 'images/animal-photo-credits.json' -Raw | ConvertFrom-Json) }
foreach ($title in $titles) {
    if ($results.title -contains $title) { continue }
    $query = [uri]::EscapeDataString($title)
    $response = Invoke-RestMethod -Headers $headers -TimeoutSec 30 -Uri "https://en.wikipedia.org/w/api.php?action=query&titles=$query&prop=pageimages&format=json&pithumbsize=800&redirects=1"
    $resolved = $title
    foreach ($redirect in $response.query.redirects) { if ($redirect.from -eq $title) { $resolved = $redirect.to } }
    $page = $response.query.pages.PSObject.Properties.Value | Where-Object { $_.title -eq $resolved } | Select-Object -First 1
    if (!$page.thumbnail.source) { Write-Warning "No image for $title"; continue }
    $fileQuery = [uri]::EscapeDataString('File:' + $page.pageimage)
    $details = $null
    $slug = ($title.ToLower() -replace '[^a-z0-9]+','-').Trim('-')
    $extension = [IO.Path]::GetExtension(([uri]$page.thumbnail.source).AbsolutePath)
    $results += [pscustomobject]@{ title=$title; image=$page.thumbnail.source; source="https://commons.wikimedia.org/wiki/$($fileQuery)" }
    Write-Output "$title : $($page.thumbnail.source)"
    $results | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath 'images/animal-photo-credits.json' -Encoding utf8
}
