import Image from "next/image"



const projects = [
    {
        "display_order": 1,
        "slug": "nexus-kv",
        "category": {
            "name": "DISTRIBUTED SYSTEMS",
            "slug": "distributed-systems"
        },
        "title": "NexusKV",
        "subtitle": "Distributed Key-Value Engine",
        "description": "High-throughput distributed KV engine in Go using Raft consensus protocol. WAL, custom LSM-tree persistence, binary serialisation via gRPC/Protobuf. Sub-5ms P99 latency.",
        "cover_image_url": "/images/projects/nexus-kv.jpg",
        "cover_image_alt": "Illuminated server racks with fiber optic patch cables in a dark data center",
        "code_url": "https://github.com/username/nexus-kv",
        "live_url": "https://nexuskv.example.com",
        "is_featured": true,
        "highlights": [
            "45k+ ops/sec",
            "sub-5ms P99",
            "3-node Raft cluster"
        ],
        "tags": [
            "Go",
            "Raft Consensus",
            "gRPC",
            "Protobuf",
            "Docker",
            "Prometheus"
        ]
    },
    {
        "display_order": 2,
        "slug": "chronos-db",
        "category": {
            "name": "DATABASE INTERNALS",
            "slug": "database-internals"
        },
        "title": "ChronosDB",
        "subtitle": "Columnar Time-Series Engine",
        "description": "Append-only time-series storage engine written in Rust featuring Gorilla XOR float compression, memory-mapped segment files, and SIMD-accelerated aggregation queries.",
        "cover_image_url": "/images/projects/chronos-db.jpg",
        "cover_image_alt": "Close-up of high-density NVMe storage blades inside a rack chassis",
        "code_url": "https://github.com/username/chronos-db",
        "live_url": "https://chronosdb.example.com",
        "is_featured": true,
        "highlights": [
            "1.4M writes/sec",
            "1.38 bytes/sample",
            "Zero-copy mmap reads"
        ],
        "tags": [
            "Rust",
            "SIMD",
            "Arrow",
            "Tokio",
            "Parquet",
            "Linux"
        ]
    },
    {
        "display_order": 3,
        "slug": "aether-mesh",
        "category": {
            "name": "CLOUD INFRASTRUCTURE",
            "slug": "cloud-infrastructure"
        },
        "title": "AetherMesh",
        "subtitle": "eBPF L4/L7 Service Mesh",
        "description": "Sidecar-less Kubernetes service mesh powered by eBPF socket-level redirection. Enforces transparent mTLS, adaptive circuit breaking, and real-time L7 traffic telemetry.",
        "cover_image_url": "/images/projects/aether-mesh.jpg",
        "cover_image_alt": "Structured network switches with glowing green link status LEDs",
        "code_url": "https://github.com/username/aether-mesh",
        "live_url": null,
        "is_featured": true,
        "highlights": [
            "38% lower tail latency",
            "Zero sidecar overhead",
            "SPIFFE/SPIRE mTLS"
        ],
        "tags": [
            "C",
            "eBPF",
            "Go",
            "Kubernetes",
            "Envoy",
            "Cilium"
        ]
    },
    {
        "display_order": 4,
        "slug": "veloce-ci",
        "category": {
            "name": "DEVELOPER TOOLS",
            "slug": "developer-tools"
        },
        "title": "VeloceCI",
        "subtitle": "Ephemeral MicroVM Build Runner",
        "description": "Isolated CI/CD execution orchestrator built on Firecracker microVMs. Boots clean Linux environments from Copy-on-Write snapshots with content-addressable build caching.",
        "cover_image_url": "/images/projects/veloce-ci.jpg",
        "cover_image_alt": "Minimalist hardware compute nodes mounted in a brushed aluminum frame",
        "code_url": "https://github.com/username/veloce-ci",
        "live_url": "https://veloceci.example.com",
        "is_featured": true,
        "highlights": [
            "140ms cold boot",
            "Hardware VM isolation",
            "Content-addressed cache"
        ],
        "tags": [
            "Rust",
            "Firecracker",
            "KVM",
            "OverlayFS",
            "gRPC",
            "GraphQL"
        ]
    },
    {
        "display_order": 5,
        "slug": "tensor-pipe",
        "category": {
            "name": "ML INFRASTRUCTURE",
            "slug": "ml-infrastructure"
        },
        "title": "TensorPipe",
        "subtitle": "Distributed LLM Inference Router",
        "description": "High-concurrency model serving gateway implementing continuous batching, PagedAttention KV-cache management, and prefix-aware request routing across GPU workers.",
        "cover_image_url": "/images/projects/tensor-pipe.jpg",
        "cover_image_alt": "Liquid-cooled GPU compute cluster with status indicators",
        "code_url": "https://github.com/username/tensor-pipe",
        "live_url": "https://tensorpipe.example.com",
        "is_featured": true,
        "highlights": [
            "3.2x token throughput",
            "Prefix-aware routing",
            "NCCL multi-GPU sync"
        ],
        "tags": [
            "C++",
            "CUDA",
            "Python",
            "Triton",
            "NCCL",
            "Redis"
        ]
    },
    {
        "display_order": 6,
        "slug": "trace-pulse",
        "category": {
            "name": "OBSERVABILITY",
            "slug": "observability"
        },
        "title": "TracePulse",
        "subtitle": "High-Cardinality Trace Engine",
        "description": "Distributed tracing ingestion pipeline and interactive flamegraph explorer. Streams OpenTelemetry spans into ClickHouse with tail-based sampling and anomaly detection.",
        "cover_image_url": "/images/projects/trace-pulse.jpg",
        "cover_image_alt": "Dark telemetry workstation displaying real-time latency histograms",
        "code_url": "https://github.com/username/trace-pulse",
        "live_url": "https://tracepulse.example.com",
        "is_featured": true,
        "highlights": [
            "250k spans/sec ingest",
            "Tail-based sampling",
            "Sub-second trace search"
        ],
        "tags": [
            "Go",
            "ClickHouse",
            "OpenTelemetry",
            "Kafka",
            "TypeScript",
            "WebGL"
        ]
    },
    {
        "display_order": 7,
        "slug": "vault-guard",
        "category": {
            "name": "SECURITY SYSTEMS",
            "slug": "security-systems"
        },
        "title": "VaultGuard",
        "subtitle": "Zero-Trust Secrets & KMS Engine",
        "description": "Cryptographic secrets manager and dynamic credential broker using Shamir's Secret Sharing, envelope encryption via AES-256-GCM, and immutable Merkle audit logs.",
        "cover_image_url": "/images/projects/vault-guard.jpg",
        "cover_image_alt": "Hardware security module appliances locked behind a perforated steel door",
        "code_url": "https://github.com/username/vault-guard",
        "live_url": null,
        "is_featured": true,
        "highlights": [
            "Shamir key unsealing",
            "Dynamic Postgres leases",
            "Merkle-tree audit log"
        ],
        "tags": [
            "Go",
            "PKCS#11",
            "AES-GCM",
            "PostgreSQL",
            "mTLS",
            "Terraform"
        ]
    },
    {
        "display_order": 8,
        "slug": "byte-forge",
        "category": {
            "name": "COMPILERS & RUNTIMES",
            "slug": "compilers-runtimes"
        },
        "title": "ByteForge",
        "subtitle": "Sandboxed WebAssembly Runtime",
        "description": "Lightweight WebAssembly bytecode interpreter and Cranelift JIT compiler for multi-tenant edge functions. Features deterministic fuel metering and capability-based WASI.",
        "cover_image_url": "/images/projects/byte-forge.jpg",
        "cover_image_alt": "Macro photograph of silicon wafer die patterns under warm lighting",
        "code_url": "https://github.com/username/byte-forge",
        "live_url": "https://byteforge.example.com",
        "is_featured": true,
        "highlights": [
            "85µs instance startup",
            "Deterministic CPU fuel",
            "Capability-based WASI"
        ],
        "tags": [
            "Rust",
            "WebAssembly",
            "Cranelift",
            "WASI",
            "LLVM",
            "Linux"
        ]
    },
    {
        "display_order": 9,
        "slug": "packet-lens",
        "category": {
            "name": "NETWORKING",
            "slug": "networking"
        },
        "title": "PacketLens",
        "subtitle": "10Gbps Deep Packet Inspector",
        "description": "Kernel-bypass network traffic analyzer built with AF_XDP and lock-free ring buffers. Performs real-time protocol dissection, JA4 TLS fingerprinting, and flow export.",
        "cover_image_url": "/images/projects/packet-lens.jpg",
        "cover_image_alt": "Dense bundle of yellow single-mode optical patch cords in a core router",
        "code_url": "https://github.com/username/packet-lens",
        "live_url": null,
        "is_featured": true,
        "highlights": [
            "14.8 Mpps line rate",
            "AF_XDP kernel bypass",
            "JA4 TLS fingerprinting",
            "Adding Something Extra"
        ],
        "tags": [
            "C++",
            "AF_XDP",
            "eBPF",
            "DPDK",
            "ZeroMQ",
            "Grafana"
        ]
    },
    {
        "display_order": 10,
        "slug": "query-craft",
        "category": {
            "name": "DATA ENGINEERING",
            "slug": "data-engineering"
        },
        "title": "QueryCraft",
        "subtitle": "Streaming SQL Materializer",
        "description": "Incremental SQL query engine over Kafka topics. Compiles windowed joins and aggregations into stateful dataflow graphs with Chandy-Lamport distributed checkpoints.",
        "cover_image_url": "/images/projects/query-craft.jpg",
        "cover_image_alt": "Modular server blades connected via high-speed InfiniBand cabling",
        "code_url": "https://github.com/username/query-craft",
        "live_url": "https://querycraft.example.com",
        "is_featured": true,
        "highlights": [
            "Exactly-once state",
            "RocksDB state backend",
            "ANSI SQL window joins"
        ],
        "tags": [
            "Rust",
            "Apache Kafka",
            "RocksDB",
            "DataFusion",
            "SQL",
            "Docker"
        ]
    }
]



export default function ProjectContainer() {
    return (
        <div className="Project_container">
            <div className="max-w-6xl m-auto flex flex-col px-5 py-5 lg:px-0">
                {
                    projects.map((project, index) => {
                        const imageOnRight = index % 2 === 1

                        return (
                            <article key={project.slug} className={`relative grid grid-cols-1 items-center gap-8 border-b border-neutral-200 py-10 first:pt-5 last:border-b-0 sm:gap-10 lg:grid-cols-2 lg:gap-16 lg:py-16 ${imageOnRight ? "lg:[&_.project-image]:order-2" : ""}`}>
                                <div className="project-image flex aspect-[3/2] w-full flex-col border border-neutral-300 bg-[#f3efe8] after:absolute relative after:-z-10 after:w-full after:h-full after:bg-gray-300 after:left-0 after:top-0 after:translate-x-5 after:translate-y-5">
                                    <div className="relative min-h-0 w-full flex-1 bg-neutral-100">
                                        <Image
                                            src="/images/image.png"
                                            className="object-cover object-center"
                                            fill
                                            sizes="(max-width: 1023px) 100vw, 50vw"
                                            alt={project.cover_image_alt}
                                        />
                                    </div>

                                    <div className="flex shrink-0 items-center justify-between border-t border-neutral-300 px-4 py-2.5 font-mono text-xs uppercase">
                                        <span className="text-[#d97a5c]">
                                            {String(project.display_order).padStart(2, "0")}
                                        </span>
                                        <span className="text-neutral-500">{project.category.name}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className="pb-5">
                                        <p className="font-mono text-xs uppercase tracking-[0.12em] text-neutral-500">{project.category.name} <span className="px-2 text-red-500">/</span>{String(project.display_order).padStart(2, "0")}</p>
                                        <h2 className="py-2 font-sans text-4xl font-medium leading-tight sm:text-5xl">{project.title}</h2>
                                        <p className="font-sans text-lg leading-relaxed text-neutral-500">{project.subtitle}</p>
                                    </div>
                                    <div className="flex flex-col gap-5 border-t border-neutral-200 pt-5">
                                        <p className="font-sans text-base leading-7 text-neutral-600">{project.description}</p>
                                        <ul className="flex flex-wrap gap-x-5 gap-y-2">
                                            {project.highlights.map((highlight, hindex) => (
                                                <li className="flex items-center gap-2 text-sm text-neutral-800" key={`project_${index}_h_${hindex}`}>
                                                    <span aria-hidden="true" className="h-px w-3 bg-red-500"></span>{highlight}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag, tindex) => (
                                                <span className="border border-neutral-200 px-3 py-1 font-mono text-xs text-neutral-600" key={`project_${index}_t_${tindex}`}>{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        )
                    })
                }
            </div>
        </div>
    )
}